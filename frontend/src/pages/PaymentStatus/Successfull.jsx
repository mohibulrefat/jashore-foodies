import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Successfull = () => {
  const { tranId } = useParams();

  useEffect(() => {
    Swal.fire({
      title: "Payment Successful",
      text: `TransactionID: ${tranId}`,
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        setTimeout(() => {
          window.location.replace("http://localhost:5173/dashboard/customer");
        }, 0);
      }
    });
  }, [tranId]);

  return <div></div>;
};

export default Successfull;
