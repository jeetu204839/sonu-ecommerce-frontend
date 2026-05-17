import Image from 'next/image';

export default function Dashboard() {
  return (
    <>

      <section className="content-header">
        <h1>
          Dashboard
          <small>Control panel</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <a href="#">
              <i className="fa fa-dashboard" /> Home
            </a>
          </li>
          <li className="active">Dashboard</li>
        </ol>
      </section>
      {/* Main content */}
      
    </>
  );
}
