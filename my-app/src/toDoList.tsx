import React, {ChangeEventHandler} from "react";
import "./App.css";
import {useState} from "react";
import {GroceryItem} from "./types/types";
import {dummyGroceryList} from "./constants"
import {useParams} from "react-router-dom";

export function ToDoList() {
    const {name} = useParams();
    const [numRemainingItems, setNumRemainingItems] = useState(0);

    let [items, setItems] = useState(dummyGroceryList);

    function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {

        const checkbox: HTMLInputElement = e.target as HTMLInputElement;

        const itemName = checkbox.name;

        const itemIndex = items.findIndex((item) => item.name === itemName);
        items[itemIndex] = {name: itemName, isPurchased: checkbox.checked};

        const newItems = items.map((item, index) =>
            index === itemIndex ? { ...item, isPurchased: checkbox.checked } : item
        );

        setItems(newItems);

        const diff = checkbox.checked ? 1:-1;

        setNumRemainingItems(numRemainingItems + diff);
    }

    return (
        <div className="App">
            <div className="App-body">
                Items bought: {numRemainingItems}
                <form action = ".">
                    {items.map((item) => ListItem(item, handleCheckboxClick))}
                </form>
                <h1>{name}'s To Do List</h1>
            </div>
        </div>

    );
}

function ListItem(item:GroceryItem, changeHandler:ChangeEventHandler) {

    return (
        <div>
            <label htmlFor={item.name}>
            <input type="checkbox" onChange={changeHandler}
            checked={item.isPurchased}
            name={item.name}
            id={item.name}
            />
            {item.name}
            </label>
        </div>
    );
}
