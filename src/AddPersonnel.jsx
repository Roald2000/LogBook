const AddPersonnel = (props) => {

    const { toggleAddPersonnel, setPersonnelPayload, handleCreatePersonnel } = props;

    const getPersonnelPayload = (e) => {
        setPersonnelPayload(values => ({ ...values, [e.target.id]: e.target.value }))
    }

    return <div className='fixed top-0 left-0 h-full w-full z-50 grid place-content-center bg-[#0004] backdrop-blur-sm overflow-y-scroll'>
        <h1 className='text-xl p-2 text-center bg-white my-2 rounded-md'>Add Personnel</h1>
        <form onSubmit={handleCreatePersonnel} className='p-6 rounded-md bg-white w-[468px] max-w-[468px] flex flex-col gap-3 relative overflow-hidden'>
            <button className='text-xl text-red-700 w-fit absolute top-2 right-2' type='button' onClick={() => toggleAddPersonnel(false)}>❌</button>
            <label className='flex flex-col gap-3' htmlFor="personnel_name">
                <span>Name (Last,First M-Initial.)</span>
                <input onChange={getPersonnelPayload} required type="text" className='p-2 rounded-md border-2 border-black' id='personnel_name' />
            </label>
            <label className='flex flex-col gap-3' htmlFor="department">
                <span>Department</span>
                <input onChange={getPersonnelPayload} required type="text" className='p-2 rounded-md border-2 border-black' id='department' />
            </label>
            <label className='flex flex-col gap-3' htmlFor="post_prof">
                <span>Position / Profession</span>
                <input onChange={getPersonnelPayload} required type="text" className='p-2 rounded-md border-2 border-black' id='position' />
            </label>
            <button className='w-fit p-2 rounded-md border-2 text-blue-600 border-blue-600' type='submit'>Add</button>
        </form>
    </div>
}

export default AddPersonnel;