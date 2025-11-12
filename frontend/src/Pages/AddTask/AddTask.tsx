import { useState, useEffect } from "react";
import "./AddTaskIndex.css";

type Props = {
    onClose: () => void;
    onSubmit: (payload: { title: string; description?: string }) => void;
    initialTitle?: string;
    initialDescription?: string;
    submitLabel?: string;
};

function AddTask({ onClose, onSubmit, initialTitle = "", initialDescription = "", submitLabel = "Adicionar" }: Props) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [titleError, setTitleError] = useState(false);

    const handleAddTask = () => {
        if (!title || !title.trim()) {
            setTitleError(true);
            return;
        }
        onSubmit({ title, description });
        setTitle("");
        setDescription("");
        setTitleError(false);
    };


    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription]);

    return (
        <div className="add-page">
            <h2 className="add-header">{submitLabel === "Editar" ? "Editar Task" : "Adicionar Tarefa"}</h2>

            <label className="form-label">
                <div className="label-title">Título</div>
                <input
                    className={"input" + (titleError ? " error" : "")}
                    type="text"
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (titleError && e.target.value.trim()) setTitleError(false);
                    }}
                />
            </label>

            <label style={{ display: 'block', marginTop: 12 }}>
                <div className="label-title">Descrição (Opcional)</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Descrição da tarefa "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>

            <div className="actions">
                <button onClick={onClose} className="button-submit">Cancelar</button>
                <button onClick={handleAddTask} className="button-submit">{submitLabel}</button>
            </div>
        </div>
    );
}

export default AddTask;