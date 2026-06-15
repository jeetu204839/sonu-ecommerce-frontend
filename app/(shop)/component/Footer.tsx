import Link from "next/link";
const Footer = () => {

  return (
    <>
      {/* Copyright */}
      <div className="container-fluid  py-2 footer-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light"><Link href="/"><i className="fas fa-copyright text-light me-2"></i>IROZEN</Link>, All right reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;