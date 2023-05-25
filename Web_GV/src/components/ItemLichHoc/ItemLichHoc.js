import React from 'react';

function ItemLichHoc({ mon, lop, tiet, phong, maLich, note, type }) {
    var bg = ' bg-blue-100 ';
    var pause =
        ' before:absolute before:left-0 before:top-11 before:w-32 before:h-4 before:bg-red-500 before:rotate-45';

    if (!!type && type === 'Lịch thi') bg = 'bg-orange-300';
    else if (!!type && type === 'Online') bg = 'bg-blue-400';
    else if (!!type && type === 'Tạm ngưng') bg = 'bg-red-400';

    return (
        <div className={'rounded-xl border relative border-gray-500 m-2 p-2 ' + bg}>
            <table className="table-child p-4 w-24 h-min text-sm">
                <tr>
                    <td>
                        <p>
                            <b>{mon}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>{lop}</td>
                </tr>
                <tr>
                    <td>{tiet}</td>
                </tr>
                <tr>
                    <td>{phong}</td>
                </tr>
                <tr>
                    <td>{maLich}</td>
                </tr>
                <tr>
                    <td>{note}</td>
                </tr>
            </table>
        </div>
    );
}

export default ItemLichHoc;
