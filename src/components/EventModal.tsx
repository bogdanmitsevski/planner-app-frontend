import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

interface IBody {
    id?: string;
    title: string;
    description: string;
    label?: string;
    day?: string;
}

export default function EventModal({ onSuccess }: { onSuccess: () => void }) {
    const { setShowEventModal, daySelected, selectedEvent } = useContext(GlobalContext);

    const [title, setTitle] = useState(selectedEvent?.title ?? "");
    const [description, setDescription] = useState(selectedEvent?.description ?? "");
    const [selectedLabel, setSelectedLabel] = useState(
        labelsClasses.find((lbl) => lbl === selectedEvent?.label) ?? labelsClasses[0]);

    function deleteEvent(id: string) {
        fetch(`http://localhost:5000/api/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                onSuccess();
                setShowEventModal(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    function handleEvent(payload: IBody) {
        fetch(`http://localhost:5000/api/${payload.id ? 'update' : 'create'}`, {
            method: payload.id ? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                onSuccess();
                setShowEventModal(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function handleDeleteButtonClick(event: any) {
        event.preventDefault();
        deleteEvent(selectedEvent?.id);
    }

    function handleSubmitButtonClick(event: any) {
        event.preventDefault();

        const bodyObject: IBody = {
            title: title,
            description: description,
            label: selectedLabel,
            day: daySelected?.toString()
        };

        if (selectedEvent?.id) {
            bodyObject.id = selectedEvent.id;
        }

        handleEvent(bodyObject);
    }
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400 ">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <button type="button" onClick={handleDeleteButtonClick}>
                            <span className="material-icons-outlined text-gray-400 cursor-pointer">
                                delete
                            </span>
                            </button>
                        )}
                        <button type="button" onClick={() => setShowEventModal(false)}>
                            <span className="material-icons-outlined text-gray-400 ">
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Add title"
                        value={title}
                        required
                        className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
                        onChange={(e) => setTitle(e.target.value)
                        } />
                        <span className="material-icons-outlined text-gray-400">
                        schedule
                    </span>
                    <p>{daySelected?.format("dddd, MMMM DD")}</p>
                    <span className="material-icons-outlined text-gray-400">
                        segment
                    </span>
                    <input
                        type="text"
                        name="description"
                        placeholder="Add description "
                        value={description}
                        required
                        className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
                        onChange={(e) => setDescription(e.target.value)
                        } />
                    <span className="material-icons-outlined text-gray-400">
                        bookmark_border
                    </span>
                    <div className="flex gap-x-2">
                        {labelsClasses.map((lblClass, i) => (
                            <span key={i} onClick={() => setSelectedLabel(lblClass)} className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
                                {selectedLabel === lblClass && (
                                    <span className="material-icons-outlined text-white text-sm">
                                        check
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                    </div>
                    
                </div>
                <footer className="flex justify-end w-100 border-t p-3 mt-5 ">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white disabled:bg-gray-400" disabled={!title} onClick={handleSubmitButtonClick}>
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}