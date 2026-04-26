import Image from 'next/image';

export default function Attributes() {
  return (
    <>
      <section className="content-header">
        <h1> Dashboard  <small>Control panel</small> </h1>
        <ol className="breadcrumb">
          <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
          <li className="active">Dashboard</li>
        </ol>
      </section>

      <div className="content">
         <div className="box">
        <div className="box-header">
          <h3 className="box-title">Attributes</h3>
        </div>
        
        <div className="box-body no-padding">
          <table className="table table-condensed">
            <tbody>
              <tr>
                <th style={{ width: 10 }}>#</th>
                <th>Task</th>
                <th>Progress</th>
                <th style={{ width: 40 }}>Label</th>
              </tr>
              <tr>
                <td>1.</td>
                <td>Update software</td>
                <td>
                  <div className="progress xs">
                    <div
                      className="progress-bar progress-bar-danger"
                      style={{ width: "55%" }}
                    />
                  </div>
                </td>
                <td>
                  <span className="badge bg-red">55%</span>
                </td>
              </tr>
              
              
              
            </tbody>
          </table>
        </div>
        
      </div>
      </div>
    </>
  );
}
