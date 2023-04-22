
const TimeOut = (props) => {
    const { toggleTimeOutModal, setTimeOutPayload, handleTimeOutSubmit } = props;

    const getTimeOutPayload = (e) => {
        setTimeOutPayload(values => ({ ...values, [e.target.id]: e.target.value }));
    }

    return <div className='fixed top-0 left-0 h-full w-full z-50 grid place-content-center bg-[#0004] backdrop-blur-sm overflow-y-scroll'>
        <h1 className='my-3 p-2 rounded-md w-full text-center text-xl bg-red-600 text-white'>Log Out Personnel</h1>
        <form onSubmit={handleTimeOutSubmit} className='p-4 rounded-md bg-white w-[468px] max-w-[468px] flex flex-col gap-3 relative'>
            <button className='text-xl text-red-700 w-fit absolute top-2 right-2' type='button' onClick={() => toggleTimeOutModal(false)}>❌</button>
            <label className='flex flex-col gap-3' htmlFor="account_no">
                <span>Account #</span>
                <input onChange={getTimeOutPayload} className='p-2 rounded-md border-2 border-black' type="text" id="account_no" />
            </label>
            <button className='p-2 rounded-md border-2 text-red-600 border-red-600' type='submit'>Logout</button>
        </form>
    </div>
}

export default TimeOut;