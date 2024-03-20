import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAppSelector } from "../../app/store";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import Loader3 from "../Loader/Loader3/Loader3";
import api from "../../API/api";
import { Iorder, Iuser } from "../../types/razorpayTypes";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function CoureseBanner() {
  const navigate = useNavigate();
  const { isLoading, course } = useAppSelector((state) => state.courseDetail);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
  };

  const verifyPayment = async (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    if (
      response.razorpay_order_id &&
      response.razorpay_payment_id &&
      response.razorpay_signature
    ) {
      try {
        const { data } = await api.post("/enrollment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Payment success",
          }).then(() => {
            navigate("/student");
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const showRazorpay = (user: Iuser, order: Iorder) => {
    const options = {
      key: "rzp_test_I43lYVXIyrWCQF", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "TutorNest",
      description: "Test Transaction",
      image: "https://lh3.google.com/u/0/d/1Yy5twTROg175kLdOXfRII8NkyHFry911",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: function (response: any) {
        verifyPayment(response);
      },
      prefill: {
        name: user.name,
        contact: user.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#6358A9",
      },
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on(
      "payment.failed",
      function (response: { error: { description: string | undefined } }) {
        Swal.fire("Failed!", response.error.description, "error").then(() => {
          navigate("/student");
        });
      }
    );
  };
  useEffect(() => {
    if (loading && course?._id) {
      (async function () {
        try {
          const { data } = await api.post("/enrollment/create", {
            courseId: course._id,
          });
          if (data.success) {
            showRazorpay(data.user, data.order);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, course?._id]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="bg-my-bg-dark w-full py-10 flex justify-center gap-40 flex-wrap items-center ">
          <>
            <div className="max-w-96">
              {isLoading ? (
                <>
                  <Skeleton
                    variant="text"
                    width={400}
                    sx={{ fontSize: "3rem" }}
                  />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton
                    variant="text"
                    width={200}
                    sx={{ fontSize: "1rem" }}
                  />
                  <Skeleton
                    variant="text"
                    width={100}
                    sx={{ fontSize: "4rem" }}
                  />
                </>
              ) : (
                <>
                  <h1 className="font-bold text-start text-4xl">
                    {course?.course?.title}
                  </h1>
                  <small>{course?.course?.description}</small> <br />
                  <Rating
                    name="read-only"
                    className="mt-3"
                    value={course?.averageRating}
                    size="small"
                    readOnly
                  />
                  <h1 className="text-2xl font-bold text-green-500">
                    ₹{course?.course?.price}
                  </h1>
                </>
              )}
            </div>
            <div className="max-w-96 space-y-5">
              {isLoading ? (
                <>
                  <Skeleton variant="rounded" width={350} height={100} />
                  <Skeleton
                    variant="text"
                    width={100}
                    sx={{ fontSize: "4rem" }}
                  />
                </>
              ) : (
                <>
                  {course?.course?.coverIMG ? (
                    <img
                      className="w-80 h-44 object-cover rounded-md"
                      src={course?.course?.coverIMG}
                      alt=""
                    />
                  ) : (
                    <>
                      {" "}
                      <Skeleton variant="rounded" width={350} height={100} />
                    </>
                  )}
                  {!course?.isEnrolled && (
                    <>
                      {loading ? (
                        <>
                          <div className="font-bold text-md flex items-center justify-center bg-primary rounded-md w-28 h-10">
                            <Loader3 />
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleClick}
                            className="font-bold text-md hover:bg-[#9263b8] bg-primary rounded-md w-28 h-10"
                          >
                            Enroll Now
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        </div>
      </ThemeProvider>
    </>
  );
}
