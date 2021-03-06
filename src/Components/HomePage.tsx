import React, { FC, useState } from 'react';
import {
    Grid,
    List,
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/core/Alert';
import Task from './Task';
import TaskForm from './TaskForm';
import { ITask } from '../interfaces/task';

const TWO_SECONDS_AND_HALF = 2500;

const HomePage: FC = () => {
    const [tasks, setTasks] = useState([{
        title: 'Tarefa 1',
        id: Math.random(),
        done: false
    }]);

    const [infoMessageModal, setInfoMessageModal] = useState('');

    const taskAddedHandler = (values: ITask) => {
        setTasks((prevState) => [
            {
                title: values.title,
                id: Math.random(),
                done: false
            },
            ...prevState
        ]);
        setInfoMessageModal('Tarefa adicionada com sucesso.');
    };

    const removeTaskHandler = (id: number) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        setInfoMessageModal('Tarefa removida com sucesso.');
    };

    const closeModalHandler = (_: any, reason: string) => {
        const isClickIngAway = reason === 'clickaway';
        if (isClickIngAway) {
            return;
        };
        setInfoMessageModal('');
    };

    const toggleCheckedTaskProp = (id: number) => {
        const taskIndex = tasks.findIndex((currentTask) => currentTask.id === id);
        tasks[taskIndex].done = !tasks[taskIndex].done;
        setTasks([...tasks]);
    };

    return (
        <Grid
            container
            sx={{
                height: '100%',
                width: '50vw',
                pt: 10,
                margin: '0 auto',
            }}
            direction="column"
        >
            <TaskForm onTaskAdded={taskAddedHandler} />
            <List>
                {tasks.map((task: any) => (
                    <Task
                        key={task.id}
                        task={task}
                        onRemove={removeTaskHandler}
                        onToggle={toggleCheckedTaskProp}
                    />
                ))}
            </List>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={!!infoMessageModal}
                autoHideDuration={TWO_SECONDS_AND_HALF}
                onClose={closeModalHandler}
            >
                <MuiAlert data-testid="modal-msg-action-task" elevation={6} variant="filled" severity="success">
                    {infoMessageModal}
                </MuiAlert>
            </Snackbar>
        </Grid>
    );
};

export default HomePage;