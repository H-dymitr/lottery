import React from "react";
import * as XLSX from "xlsx";

export const Winners = (props: {names: string[], reset(): void}) => {
    const onDownload = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(props.names.map((name) => ({firstName: name.split(' ')[0], lastName: name.split(' ')[1]})));
        XLSX.utils.book_append_sheet(wb, ws, "Winners");
        XLSX.writeFile(wb, "winners.xlsx");
    }
    return (
        <div className="rounded overflow-hidden shadow-lg bg-primary p-4">
            <div className="flex items-center justify-between">
                <button onClick={props.reset} className="w-full mr-1 bg-accent hover:bg-accent-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Zresetuj
                </button>
                <button onClick={onDownload} className="w-full ml-1 bg-accent hover:bg-accent-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Pobierz
                </button>
            </div>
            <h3>Zwycięzcy :</h3>
            <ul className="list-decimal px-6">
            {props.names.map((name, index) => (
                <li key={index} className="py-2 font-lg move-up">{name}</li>
            ))}
            </ul>
        </div>
    );
}
