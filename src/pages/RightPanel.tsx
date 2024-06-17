import { useEffect } from "react";

import {
    selectActiveListId,
    setActiveListId,
} from "../features/list/listSlice";
import { useAppDispatch, useAppSelector } from "../features/store";
import { fetchTodoAsync } from "../features/todo/todoAction";
import { selectTodos } from "../features/todo/todoSlice";
import { Todo } from "../types/todo.type";
import { TodoItem } from "../components/molecules/TodoItem";
import { Button, Container, Grid } from "@mui/material";
import { SortByBtn } from "../components/atoms/SortByBtn";
import {
    selectIsAsc,
    selectSortBy,
} from "../features/sortOption/sortOptionSlice";
import { SortDirectionBtn } from "../components/atoms/SortDirectionBtn";
import { Header } from "../components/molecules/Header";
import TodoPanel from "../components/molecules/TodoPanel";


const RightPanel = () => {
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                style={{ height: "90vh" }}
            >
                <Grid item style={{ flex: "1 1 auto" }}>
                    <Container
                        sx={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            margin: "0.5rem",
                            marginTop: "1rem",
                            width: "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Header />
                    </Container>
                </Grid>
                <Grid item style={{ flex: "6 1 auto" }}>
                    <TodoPanel />
                </Grid>
            </Grid>
        </>
    );
};
export default RightPanel;
