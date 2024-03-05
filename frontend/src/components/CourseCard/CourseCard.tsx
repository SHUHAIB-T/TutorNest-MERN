export default function CourseCard() {
  return (
    <>
      <div className="flex flex-col bg-mycard-body hover:scale-105 duration-300 hover:shadow-lg w-60 h-fit rounded-2xl">
        <img
          src="https://nmgprod.s3.amazonaws.com/media/files/66/9b/669b359221e7076becde0f9d1cd7a454/cover_image.jpg.760x400_q85_crop_upscale.jpg"
          alt=""
          className="rounded-2xl hover:border-b-4 border-my-ring"
        />
        <div className="leading-none m-3">
          <h1 className="font-bold text-white text-2xl">Leadership</h1>
          <small className="text-white leading-none">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio modi,
            sequi delectus exercitationem tempora atque rem, eos omnis expedita
            earum at ipsa quasi error maiores unde. Nisi dolorem laborum
            voluptatibus.
          </small>
        </div>
        <button className="font-bold text-white w-full bg-primary hover:bg-my-ring py-2 rounded-b-2xl">
          view
        </button>
      </div>
    </>
  );
}
