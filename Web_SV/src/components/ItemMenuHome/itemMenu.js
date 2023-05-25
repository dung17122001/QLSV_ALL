function ItemMenu({ Icon, NameMenu, onClick }) {
    return (
        <>
            <div
                className="flex flex-col w-44 h-24 text-sv-text-1 bg-white items-center justify-center border border-white rounded cursor-pointer hover:text-sv-blue-4"
                onClick={onClick}
            >
                <div className="w-full  flex justify-center p-2">{Icon}</div>
                <div className="">{NameMenu}</div>
            </div>
        </>
    );
}

export default ItemMenu;
