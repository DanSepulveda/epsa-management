const docx = require('docx')
const fs = require('fs')
const Record = require('../models/Record')
const formatDate = require('../utils/formatDate')
const app = require('../config/firebase')
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage')

const { Document, Table, TableRow, Paragraph, Packer, TableCell, AlignmentType, Header, ImageRun, convertMillimetersToTwip, BorderStyle } = docx

const reportsControllers = {
    monthlyReport: async (req, res) => {
        const { month } = req.body
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',]
        const selectedMonth = months[month.split('-')[1] - 1]
        const year = month.split('-')[0]

        try {
            if (!req.currentUser) throw new Error('Access denied')

            const recordsbyDay = await Record.aggregate([
                { $match: { user_id: req.currentUser._id } },
                {
                    $group: {
                        _id: '$date', records: { $push: { activity: '$activity', description: '$description' } }
                    }
                },
                { $project: { date: '$_id', records: 1, _id: 0 } }
            ]).sort({ date: 1 })

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
                            tableCell('Loreto Aybar Valencia', 63, 'normal', 'left')
                        ],
                    }),
                    new TableRow({
                        children: [
                            tableCell('Función:', 37, 'bold', 'left'),
                            tableCell('Psicóloga', 63, 'normal', 'left')
                        ]
                    }),
                    new TableRow({
                        children: [
                            tableCell('Periodo al que corresponde:', 37, 'bold', 'left'),
                            tableCell(`${selectedMonth} ${year}`, 63, 'normal', 'left')
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
                        mainTable
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

            const filename = `${selectedMonth}${year}.docx`

            Packer.toBuffer(doc).then((buffer) => {
                fs.writeFileSync(filename, buffer);
            })

            const file = fs.readFileSync(`./${selectedMonth}${year}.docx`)

            const storage = getStorage(app)
            const storageRef = ref(storage, `reports/${filename}`)

            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!')
            })
            const url = await getDownloadURL(storageRef)

            // res.download(`./${selectedMonth}${year}.docx`)

            res.status(200).json({ success: true, response: url })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }


    }
}

module.exports = reportsControllers