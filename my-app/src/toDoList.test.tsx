import {render, screen, fireEvent} from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { BrowserRouter as Router } from "react-router-dom";
import { dummyGroceryList } from "./constants";

describe("ToDoList Testing", () => {

    test("rendering grocery list", () => {
        render(
            <Router>
                <ToDoList/>
            </Router>
        );

        dummyGroceryList.forEach(item => {
            const title = screen.getByText(item.name);
            expect(title).toBeInTheDocument();
        }); 
    });

    test("Testing checked items", () => {

        render(
            <Router><ToDoList/></Router>
        );

        const checkbox = screen.getByRole("checkbox", {name: "Apples"}) as HTMLInputElement;
        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(true);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(false);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
    });
})