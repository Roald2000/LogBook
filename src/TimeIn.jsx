
const TimeIn = (props) => {
    const { toggleTimeInModal, setTimeInPayload, handleTimeInSubmit } = props;

    const getTimeInPayload = (e) => {
        setTimeInPayload(values => ({ ...values, [e.target.id]: e.target.value }));
    }

    return <div className='fixed top-0 left-0 h-full w-full z-50 grid place-content-center bg-[#0004] backdrop-blur-sm overflow-y-scroll'>
        <h1 className='my-3 p-2 rounded-md w-full text-center text-xl bg-blue-600 text-white'>Log In Personnel</h1>
        <form onSubmit={handleTimeInSubmit} className='p-4 rounded-md bg-white w-[468px] max-w-[468px]  flex flex-col gap-3 relative'>
            <button className='text-xl text-red-700 w-fit absolute top-2 right-2' type='button' onClick={() => toggleTimeInModal(false)}>❌</button>
            <label className='flex flex-col gap-3' htmlFor="account_no"><span>Account #</span> <input onChange={getTimeInPayload} className='p-2 rounded-md border-2 border-black' type="text" id="account_no" /></label>
            <button className='p-2 rounded-md border-2 text-blue-600 border-blue-600' type='submit'>Login</button>
        </form>
    </div>
}


export default TimeIn;