import Link from "next/link";
import "./cat.css";

export default function Cat() {
  return (
    <>
      <div className="cat">
        <div className="ear ear--left"></div>
        <div className="ear ear--right"></div>
        <div className="face">
          <div className="eye eye--left">
            <div className="eye-pupil"></div>
          </div>
          <div className="eye eye--right">
            <div className="eye-pupil"></div>
          </div>
          <div className="muzzle"></div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center">Page Not Found</h1>
        <Link className="text-center" href="/">
          Back to Homepage
        </Link>
      </div>
    </>
  );
}
