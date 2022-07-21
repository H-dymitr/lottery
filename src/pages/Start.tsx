import React from "react";
import * as XLSX from "xlsx";

export const Start = (props: {onGenerate: (names: string[]) => void}) => {

    const [names, setData] = React.useState([]);
    const [allNames, setAll] = React.useState([]);
    const [amount, setAmount] = React.useState('30');

    const onChangeAmount = (e: any) => {
        setAmount(e.target.value);
    }
    const onChange = (e: any) => {
        const [file] = e.target.files;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            // @ts-ignore
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            // @ts-ignore
            const unshuffled = data.split("\n").map((name: string) => name.replace(',', ' '));
            unshuffled.shift();
            // @ts-ignore
            setAll(unshuffled);
        };
        reader.readAsBinaryString(file);
    };

    const generate = () => {
        setData([]);
        const asd = allNames.map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .filter((value, index, array) => index < +amount);
        props.onGenerate(asd);
    }
    return (
        <div className="rounded overflow-hidden shadow-lg bg-primary p-4">
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="amount">
                    Wpisz ilość osób
                </label>
                <input
                    value={amount} onChange={onChangeAmount}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="amount" type="text" placeholder="" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="file_input">Upload
                    file</label>
                <input
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="file_input" onChange={onChange} type="file" />
            </div>
            <button onClick={generate} className="w-full bg-accent hover:bg-accent-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Losuj
            </button>

        </div>
    );
}
