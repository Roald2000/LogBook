
import { useState, useEffect, useRef } from 'react'

import http_request from './request_config';

import AddPersonnel from './AddPersonnel';
import TimeIn from './TimeIn';
import TimeOut from './TimeOut';

import swal from 'sweetalert';


const newTime = new Date();
let create_time = {
    timeOnly: newTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' }),
    dateOnly: newTime.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/[/]/g, "-"),
    date_time: newTime.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/[/]/g, "-") + " " + newTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' }),
}


const EditModal = (props) => {
    const { toggleEditEntryModal, edit_entry_values, loadEntryLogs } = props;
    const { log_id, personnel_name, date_entry, time_in, time_out } = edit_entry_values;

    const update_time_in = useRef(null);
    const update_time_out = useRef(null);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const update_payload = {
                time_in: update_time_in.current.value,
                time_out: update_time_out.current.value,
                date_entry: date_entry
            }
            let response = await http_request.put(`/personnel/edit_entry/${log_id}`, update_payload);
            await swal("Update Success", response.data.message, { icon: 'success', closeOnEsc: true, closeOnClickOutside: true, button: false })
            await loadEntryLogs(create_time.dateOnly);
        } catch (error) {
            if (!error?.response) {
                await swal("HTTP REQUEST ERROR", "No Server Response", { icon: 'error', closeOnEsc: true, closeOnClickOutside: true, button: false })
                console.error(error);
            } else {
                await swal("Update Fail", error?.response.data.message, { icon: 'error', closeOnEsc: true, closeOnClickOutside: true, button: false })
                console.error(error?.response);
            }
        }
    }

    return <div className='fixed top-0 left-0 h-full w-full z-50 grid place-content-center place-items-center bg-[#0004] backdrop-blur-sm overflow-y-scroll'>
        <h1 className='text-lg p-2 text-center bg-white my-2 rounded-md'>Now Modifiying Entry # <strong>{log_id}</strong> | Personnel : <strong className='underline'>{personnel_name}</strong></h1>
        <h2 className='text-base p-2 text-center bg-white my-2 rounded-md' >Modifying Entry of '{date_entry}'</h2>
        <form onSubmit={handleUpdateSubmit} className='p-6 rounded-md bg-white w-[468px] max-w-[468px] flex flex-col gap-3 relative overflow-hidden'>
            <button className='text-xl text-red-700 w-fit absolute top-2 right-2' type='button' onClick={() => toggleEditEntryModal(false)}>❌</button>
            <label className='flex flex-col gap-3' htmlFor="time_in">
                <span>Time In</span>
                <input ref={update_time_in} defaultValue={time_in} required type="text" className='p-2 rounded-md border-2 border-black' id='time_in' />
            </label>
            <label className='flex flex-col gap-3' htmlFor="time_out">
                <span>Time Out</span>
                <input ref={update_time_out} defaultValue={time_out} required type="text" className='p-2 rounded-md border-2 border-black' id='time_out' />
            </label>
            <button className='p-2 rounded-md w-fit border-2 border-orange-600 text-orange-600' type='submit'>Update</button>
        </form>
    </div>
}





const App = () => {

    // Modal Toggles
    const [timeinModal, toggleTimeInModal] = useState(false);
    const [timeoutModal, toggleTimeOutModal] = useState(false);
    const [createPersonnelModal, toggleAddPersonnel] = useState(false);

    // PayloadValues/SetterValues
    const [timein_payload, setTimeInPayload] = useState({});
    const [timeout_payload, setTimeOutPayload] = useState({});
    const [add_personnel_payload, setPersonnelPayload] = useState({});

    const handleTimeInSubmit = async (e) => {
        e.preventDefault();
        try {
            const new_timein_payload = {
                account_no: timein_payload.account_no,
                date_entry: create_time.dateOnly,
                time_in: create_time.timeOnly,
            }
            let response = await http_request.post('/personnel/timein', new_timein_payload);
            await swal("Time In Success", response?.data.message, { icon: 'success', closeOnClickOutside: true, closeOnEsc: true, button: false });
            await loadEntryLogs(create_time.dateOnly);
        } catch (error) {
            if (!error?.response) {
                console.error("NO SERVER RESPONSE", error);
            } else {
                await swal("Time In Failed", error?.response?.data.message, { icon: 'error', closeOnClickOutside: true, closeOnEsc: true, button: false });
                console.error(error?.response?.data, error);
            }
        }
    }

    const handleTimeOutSubmit = async (e) => {
        e.preventDefault();
        try {
            const new_timeout_payload = {
                account_no: timeout_payload.account_no,
                date_entry: create_time.dateOnly,
                time_out: create_time.timeOnly,
            }
            let response = await http_request.post('/personnel/timeout', new_timeout_payload);
            console.log(response.data);
            await swal("Time Out Success", response?.data.message, { icon: 'success', closeOnClickOutside: true, closeOnEsc: true, button: false });
            await loadEntryLogs(create_time.dateOnly);
        } catch (error) {
            if (!error?.response) {
                console.error("NO SERVER RESPONSE", error);
            } else {
                await swal("Time Out Failed", error?.response?.data.message, { icon: 'error', closeOnClickOutside: true, closeOnEsc: true, button: false });
                console.error(error?.response?.data, error);
            }
        }
    }

    const handleCreatePersonnel = async (e) => {
        e.preventDefault();
        try {
            let response = await http_request.post('/personnel/add_personnel', add_personnel_payload);
            await swal("Add Personnel Success", response.data.message, { icon: 'success', closeOnClickOutside: true, closeOnEsc: true, button: false });
        } catch (error) {
            if (!error?.response) {
                console.error("NO SERVER RESPONSE", error);
            } else {
                await swal("Add Personnel Failed", error?.response?.data.message, { icon: 'error', closeOnClickOutside: true, closeOnEsc: true, button: false });
                console.error(error?.response?.data, error);
            }
        }
    }

    const [list_items, setListItems] = useState([]);
    const [isListLoaded, isLoaded] = useState(false);

    const loadEntryLogs = async (date_entry) => {
        try {
            let response = await http_request.get('/personnel/record_logs/' + date_entry);
            const List = await response.data.list_items;
            setListItems(await List);
            isLoaded(true);
        } catch (error) {
            if (!error?.response) {
                console.error(error);
                isLoaded(false);
            } else {
                setListItems(await error?.response.data.message);
                isLoaded(false);
            }
        }
    }

    const [findPayload, setFindPayload] = useState({});
    const getFindPayload = (e) => {
        setFindPayload(values => ({ ...values, [e.target.id]: e.target.value }))
    }

    const findPersonnelRecordEntryLog = async (e) => {
        e.preventDefault();
        try {
            if (findPayload?.find_date_entry == undefined) {
                swal("Input Error", "Date must be specified", { icon: 'error', closeOnClickOutside: true, closeOnEsc: true, button: false });
            } else if (findPayload?.find_account_no == undefined) {
                swal("Input Error", "Account # must be specified", { icon: 'error', closeOnClickOutside: true, closeOnEsc: true, button: false });
            } else {
                let response = await http_request.get(`/personnel/find/${findPayload?.find_date_entry}/${findPayload?.find_account_no}`)
                const List = await response.data.list_items;
                setListItems(await List);
                isLoaded(true);
            }
        } catch (error) {
            if (!error?.response) {
                console.error(error);
                isLoaded(false);
            } else {
                setListItems(await error?.response.data.message);
                isLoaded(false);
            }
        }
    }

    useEffect(() => {
        loadEntryLogs(create_time.dateOnly);
        () => {
            loadEntryLogs('');
        }
    }, []);


    const deleteEntry = async (id) => {
        try {
            let response = await http_request.delete(`/personnel/entry/delete/${id}`);
            await swal("Delete Success", ` ${response.data.message} | Entry # ${id} has been deleted!`, { icon: 'success', closeOnEsc: true, closeOnClickOutside: true, button: false })
            await loadEntryLogs(create_time.dateOnly);
        } catch (error) {
            if (!error?.response) {
                await swal("HTTP REQUEST ERROR", "No Server Response", { icon: 'error', closeOnEsc: true, closeOnClickOutside: true, button: false })
                console.error(error);
            } else {
                await swal("Update Fail", error?.response.data.message, { icon: 'error', closeOnEsc: true, closeOnClickOutside: true, button: false })
                console.error(error?.response);
            }
        }
    }


    const [edit_entry_modal, toggleEditEntryModal] = useState(false);
    const [edit_entry_values, setEditEntryValues] = useState('');


    return <main className='relative container mx-auto my-0 p-4'>
        {timeinModal && <TimeIn toggleTimeInModal={toggleTimeInModal} setTimeInPayload={setTimeInPayload} handleTimeInSubmit={handleTimeInSubmit} />}
        {timeoutModal && <TimeOut toggleTimeOutModal={toggleTimeOutModal} setTimeOutPayload={setTimeOutPayload} handleTimeOutSubmit={handleTimeOutSubmit} />}
        {createPersonnelModal && <AddPersonnel toggleAddPersonnel={toggleAddPersonnel} setPersonnelPayload={setPersonnelPayload} handleCreatePersonnel={handleCreatePersonnel} />}
        {edit_entry_modal && <EditModal toggleEditEntryModal={toggleEditEntryModal} edit_entry_values={edit_entry_values} loadEntryLogs={loadEntryLogs} />}
        <section className='container mx-auto my-5 p-5 flex flex-col justify-start items-stretch gap-3'>
            <form onSubmit={findPersonnelRecordEntryLog} className='flex flex-wrap gap-3 items-center justify-between'>
                <div className='flex flex-wrap gap-3 items-center justify-start'>
                    <label className='flex items-center justify-start gap-3' htmlFor="find_date_entry"><span> Date Entry</span> <input required onInput={(e) => loadEntryLogs(e.target.value)} onChange={getFindPayload} className='p-2 rounded-md border-2 border-black' type="date" id="find_date_entry" /></label>
                    <label className='flex items-center justify-start gap-3' htmlFor="find_account_no"><span> Account #</span> <input required onChange={getFindPayload} className='p-2 rounded-md border-2 border-black' type="text" id="find_account_no" /></label>
                    <button className='p-2 rounded-md border-2 border-blue-600 text-blue-600' type='submit'  > Find</button>
                </div>
                <div className='flex flex-wrap gap-3 items-center justify-start'>
                    <button className='p-2 rounded-md border-2 border-black' type='button' onClick={() => toggleTimeInModal(true)} >Time In </button>
                    <button className='p-2 rounded-md border-2 border-black' type='button' onClick={() => toggleTimeOutModal(true)} >Time Out </button>
                    <button className='p-2 rounded-md border-2 border-black' type='button' onClick={() => toggleAddPersonnel(true)} >Add Personnel </button>
                </div>
            </form>
            <div className={`${list_items.length > 34 && 'h-[468px] overflow-y-scroll pr-3'}`}>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-orange-600 text-white'>
                            <th className='p-2 text-start text-sm'>Log No.</th>
                            <th className='p-2 text-start text-sm'>Personnel</th>
                            <th className='p-2 text-start text-sm'>Position | Department</th>
                            <th className='p-2 text-start text-sm'>Date Entry</th>
                            <th className='p-2 text-start text-sm'>Time In</th>
                            <th className='p-2 text-start text-sm'>Time Out</th>
                            <th className='p-2 text-start text-sm'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isListLoaded && list_items.map(item =>
                            <tr key={item.log_id} className='odd:bg-orange-100 even:bg-orange-200'>
                                <td className='px-2 py-3 text-start text-sm'>{item.log_id}</td>
                                <td className='px-2 py-3 text-start text-sm'>{item.personnel_name}</td>
                                <td className='px-2 py-3 text-start text-sm'>{item.position} | <span className='bg-slate-300 p-1 rounded'>{item.department}</span></td>
                                <td className='px-2 py-3 text-start text-sm'>{item.date_entry}</td>
                                <td className='px-2 py-3 text-start text-sm'>{item.time_in}</td>
                                <td className='px-2 py-3 text-start text-sm'>{`${item.time_out !== '' ? item.time_out : 'N/A'}`}</td>
                                <td className='px-2 py-3 text-start text-sm flex gap-2'>
                                    <button className='hover:underline underline-offset-4' type='button' onClick={() => {
                                        toggleEditEntryModal(true);
                                        setEditEntryValues({
                                            log_id: item.log_id,
                                            personnel_name: item.personnel_name,
                                            date_entry: item.date_entry,
                                            time_in: item.time_in,
                                            time_out: item.time_out
                                        })
                                    }}>Edit</button>
                                    <button className='hover:underline underline-offset-4' type='button' onClick={() => deleteEntry(item.log_id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                        {!isListLoaded &&
                            <tr>
                                <td colSpan={7} className='p-2 bg-red-600 text-white text-center'>Enter A Valid Date! {list_items}</td>
                            </tr>}

                    </tbody>
                </table>
            </div>
        </section>
    </main >
}

export default App