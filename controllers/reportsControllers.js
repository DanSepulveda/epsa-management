const docx = require('docx')
const path = require('path')
const fs = require('fs')
const os = require('os')
const Record = require('../models/Record')
const formatDate = require('../utils/formatDate')
const admin = require('../config/firebase.js')
const axios = require('axios')
const { Document, Table, TableRow, Paragraph, Packer, TableCell, AlignmentType, Header, ImageRun, convertMillimetersToTwip, BorderStyle, twipsMeasureValue } = docx

const reportsControllers = {
    monthlyReport: async (req, res) => {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ]
        const { date } = req.body
        const month = date.split('-')[1] - 1
        const year = date.split('-')[0]
        const { fullname, position, signature, uid, _id } = req.user

        try {
            if (!req.user) throw new Error('Access denied')

            const urlToBuffer = async (url) => {
                const response = await axios(url, { responseType: 'arraybuffer' })
                const buffer64 = Buffer.from(response.data, 'binary').toString('base64')
                return buffer64
            }

            // Generating buffer from sign image url
            const imgBuf = await urlToBuffer(signature)
            const buf = Buffer.from(imgBuf, 'base64')

            // Creating sign image file on OS temp
            const fileExtension = signature.split('sign')[1].split('?')[0]
            const imagePath = path.join(os.tmpdir(), `sign${fileExtension}`)
            fs.writeFileSync(imagePath, buf)

            const fromDate = new Date(parseInt(year), parseInt(month), 1)
            const toDate = new Date(parseInt(year), parseInt(month) + 1, 0)

            // Getting records from database
            const recordsbyDay = await Record.aggregate([
                { $match: { user_id: _id, date: { '$gte': fromDate, '$lte': toDate } } },
                {
                    $group: {
                        _id: '$date', records: { $push: { activity: '$activity', description: '$description' } }
                    }
                },
                { $project: { date: '$_id', records: 1, _id: 0 } }
            ]).sort({ date: 1 })

            if (!recordsbyDay.length) throw new Error('no-records')

            const br = () => {
                return new Paragraph({ text: '' })
            }

            const tableCell = (text, width, weight, position, skip = false) => {
                const style = weight === 'bold' ? 'boldPara' : 'normalPara'

                const alignment = position === 'left'
                    ? AlignmentType.LEFT
                    : position === 'center'
                        ? AlignmentType.CENTER
                        : AlignmentType.JUSTIFIED

                const borders = text === ''
                    ? {
                        top: {
                            style: BorderStyle.DASH_DOT_STROKED,
                            size: 1,
                            color: "ffffff"
                        }
                    }
                    : {}

                const children = [new Paragraph({
                    text,
                    style,
                    alignment,
                    spacing: {
                        line: 276
                    }
                }),]

                if (skip) children.push(br())

                return new TableCell({
                    children,
                    width: {
                        size: `${width}%`
                    },
                    shading: {
                        fill: weight === 'bold' ? '#BDD6EE' : '#FFFFFF'
                    },
                    margins: {
                        left: convertMillimetersToTwip(2),
                        right: convertMillimetersToTwip(2),
                    },
                    borders
                })
            }

            const paragraph = (text, header = false) => {
                const style = header ? 'headerPara' : 'normalPara'

                return new Paragraph({
                    text,
                    style
                })
            }

            const headerImage = new ImageRun({
                data: fs.readFileSync('./assets/logo-epsa.png'),
                transformation: {
                    height: 83,
                    width: 69
                }
            })

            const signImage = new ImageRun({
                data: fs.readFileSync(imagePath),
                transformation: {
                    height: 150,
                    width: 150
                }
            })

            const footer = new Paragraph({
                children: [signImage],
                alignment: AlignmentType.CENTER
            })

            const headerTable = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [headerImage],
                                    })
                                ],
                                borders: {
                                    top: { size: 5 },
                                    bottom: { size: 5 },
                                    left: { size: 5 },
                                    right: { size: 5 }
                                },
                                margins: {
                                    left: convertMillimetersToTwip(2),
                                    right: convertMillimetersToTwip(2),
                                }
                            }),
                            new TableCell({
                                children: [
                                    paragraph('Escuela Patronato San Antonio', true),
                                    paragraph('Unidad Técnica Pedagógica ', true),
                                    paragraph('Pedro Lagos #536', true)
                                ],
                                borders: {
                                    top: { size: 5 },
                                    bottom: { size: 5 },
                                    left: { size: 5 },
                                    right: { size: 5 }
                                },
                                margins: {
                                    left: convertMillimetersToTwip(2),
                                    right: convertMillimetersToTwip(2),
                                }
                            }),
                        ],
                    })
                ],
            })

            const introTable = new Table({
                width: {
                    size: '100%'
                },
                rows: [
                    new TableRow({
                        children: [
                            tableCell('Nombre:', 37, 'bold', 'left'),
                            tableCell(fullname, 63, 'normal', 'left')
                        ],
                    }),
                    new TableRow({
                        children: [
                            tableCell('Función:', 37, 'bold', 'left'),
                            tableCell(position, 63, 'normal', 'left')
                        ]
                    }),
                    new TableRow({
                        children: [
                            tableCell('Periodo al que corresponde:', 37, 'bold', 'left'),
                            tableCell(`${months[month]} ${year}`, 63, 'normal', 'left')
                        ]
                    })
                ],
            })

            const mainTableRow = () => {
                let rows = [new TableRow({
                    children: [
                        tableCell('Fecha', 33, 'bold', 'center'),
                        tableCell('Actividad', 33, 'bold', 'center'),
                        tableCell('Descripción de la actividad', 33, 'bold', 'center')
                    ],
                }),]

                let days = []
                let date

                recordsbyDay.forEach(day => {
                    day.records.forEach(record => {
                        date = days.includes(day.date) ? '' : formatDate(day.date)
                        if (!days.includes(day.date)) days.push(day.date)

                        rows.push(new TableRow({
                            children: [
                                tableCell(date, 33, 'normal', 'center', true),
                                tableCell(record.activity, 33, 'normal', 'center', true),
                                tableCell(record.description, 33, 'normal', 'justified', true),
                            ]
                        }))
                    })
                })
                return rows
            }

            const mainTable = new Table({
                width: {
                    size: '100%'
                },
                rows: mainTableRow()
            })

            const doc = new Document({
                sections: [{
                    properties: {
                        page: {
                            size: {
                                width: twipsMeasureValue(12240),
                                height: twipsMeasureValue(15840)
                            }
                        }
                    },
                    headers: {
                        default: new Header({
                            children: [headerTable]
                        })
                    },
                    children: [
                        br(),
                        br(),
                        br(),
                        paragraph('Informe mensual de actividades'),
                        br(),
                        br(),
                        br(),
                        introTable,
                        br(),
                        br(),
                        paragraph('Detalle de actividades realizadas:'),
                        br(),
                        mainTable,
                        br(),
                        br(),
                        br(),
                        footer,
                        br(),
                        new Paragraph({
                            text: 'Firma Profesional',
                            alignment: AlignmentType.CENTER,
                            style: 'normalPara'
                        })
                    ]
                }],
                styles: {
                    default: {

                    },
                    paragraphStyles: [
                        {
                            id: 'normalPara',
                            run: {
                                font: 'Calibri (Cuerpo)',
                                size: 24,
                            }
                        },
                        {
                            id: 'boldPara',
                            run: {
                                font: 'Calibri (Cuerpo)',
                                size: 24,
                                bold: true
                            }
                        },
                        {
                            id: 'headerPara',
                            run: {
                                font: 'Calibri (Cuerpo)',
                                size: 22,
                            }
                        },
                    ]
                }
            })

            // Creating docx file on OS temp
            const filename = `${months[month]}${year}.docx`
            const tempPath = path.join(os.tmpdir(), filename)
            const buffer = await Packer.toBuffer(doc)
            fs.writeFileSync(tempPath, buffer)

            // Saving dociment on Firebase storage
            const bucket = await admin.storage().bucket("panel-epsa.appspot.com")
            const destination = `users/${uid}/monthly-reports/${filename}`
            const file = await bucket.upload(tempPath, { destination })

            const ref = file[0].metadata.name

            res.status(200).json({ success: true, response: ref })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    }
}

module.exports = reportsControllers