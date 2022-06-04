import Box from './layout/Box'

function InfoBox({ children, searching = false }) {
  const source = searching ? '/assets/looking-mickey.png' : '/assets/sad-minnie.png'

  return (
    <div className="flex justify-center">
      <Box>
        <div className="py-4 flex items-center max-w-md">
          <img src={source} alt="Sad Mickey" className="h-40 sm:h-24 mr-10" />
          <h3 className="text-2xl text-center">{children}</h3>
        </div>
      </Box>
    </div>
  )
}

export default InfoBox
