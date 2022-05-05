const Box = ({ children }) => {

    return (
        <div className='bg-neutral-100 py-6 px-10 rounded-md shadow shadow-rose-900'>
            {children}
        </div>
    )
}

export default Box

// .box {
//     width: 25vw;
//     min-height: 80vh;
//     border-radius: 5px;
//     background-color: rgb(var(--neutral-100));
//     box-shadow: 2px 2px 15px rgba(var(--rose-900), 0.2), -2px -2px 15px rgba(var(--rose-900), 0.2);
//     padding: 2em 3em;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between;
//     gap: 20px
// }