export default function SideBar() {
  return (
    <>
      <div className="flex relative flex-col items-center h-[80vh] overflow-hidden rounded-2xl bg-mycard-body w-72">
        <div className="w-full sticky top-0 p-3 bg-my-bg-dark">
          <div className="flex justify-between w-full text-white gap-3 sticky top-0">
            <h1 className="text-white mt-2 font-bold">CHATS</h1>
            <span className="font-bold cursor-pointer">...</span>
          </div>
          <input
            type="text"
            className="bg-[#261538] border-0 rounded-full w-full pr-3 ring-my-ring ring-1 h-8 my-2 text-white"
            placeholder="search..."
            name=""
            id=""
          />
        </div>
        <div
          id="scrol-y"
          className="grid w-full grid-cols-1 divide-y overflow-y-auto divide-violet-800"
        >
          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>

          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
          <div className="flex w-full gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
        </div>
      </div>
    </>
  );
}
