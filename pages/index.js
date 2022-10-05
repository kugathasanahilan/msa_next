import axios from 'axios'
import { useState } from 'react'
import NavBar from "./components/NavBar";

function Home () {
  const [bl_no, setBl_no] = useState('');
  const [data, setData] = useState('');
  function getBl() {
    axios.get(`//infoshipco.net/msa_col/api/bl_tracking.php?bl_no=${bl_no}`)
    .then(function (response) {                 
      setData(response.data); 
    })
    .catch(function (error) {
      console.log(error);
    }); 
  } 
    // render data
    return (
      <>
      <NavBar />
  <div className='container-fluid'>
      <br/>
    <div className="row justify-content-center">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <div className="row g-3">
                        <div className="col">
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter BL No'
                            value={bl_no}
                            onChange={e => { setBl_no(e.currentTarget.value); }}
                            onKeyUp={() => {getBl()}}
                        />  
                        </div>
                        <div className="col">
                            <button className="btn btn-danger" type='button' onClick={getBl}>Track BL</button>
                        </div>
                    </div>
                    </div>
            </div>
    <br/>       
  {data !== '' ? data?.results_details?.exists==false ? <div className="alert alert-danger text-center" role="alert">BL NOT FOUND</div> :
  <div className="card-body">
      <div className="bg-secondary text-white p-1 mb-2">BRANCH </div>
      <div className="row">
      <div className="table-responsive col-sm-3">
          <table className='table table-bordered table-hover table-sm table-striped'>
            <thead></thead>
          <tbody>
              <tr>
                  <td className="fw-light">BL No</td>
                  <td>{data?.bl_details?.bl_no }</td>
              </tr>
                   <tr>
                      <td className="fw-light">Vessel Status</td>
                      <td>{data?.bl_details?.vessel_status==1 ? <span className="text-success fw-bold">SAILED</span> : <span className="text-danger fw-bold">NOT SAILED</span> }</td>
                  </tr>
                  <tr>
                      <td className="fw-light">Date Of Issue</td>
                      <td>{data?.bl_details?.date_of_issue }</td>
                  </tr>
               <tr>
                  <td className="fw-light">BL Status</td>
                  <td><span className="fw-bold">{data?.bl_details?.surrender_status }</span></td>
              </tr>
              <tr>
                  <td className="fw-light">Vessel</td>
                  <td>{data?.bl_details?.vessel }</td>
              </tr>
              <tr>
                  <td className="fw-light">Voyage</td>
                  <td>{data?.bl_details?.voyage } </td>
              </tr>
              <tr>
                  <td className="fw-light">ETD</td>
                  <td>{data?.bl_details?.voyage_date }</td>
              </tr>
              <tr>
                  <td className="fw-light">Port Of Loading</td>
                  <td>{data?.bl_details?.pol }</td>
              </tr>
              <tr>
                  <td className="fw-light">Port Of Discharge</td>
                  <td>{data?.bl_details?.pod }</td>
              </tr>
              <tr>
                  <td className="fw-light">Terminal</td>
                  <td>{data?.bl_details?.terminal ? data?.bl_details?.terminal : 'N/A'}</td>
              </tr>
              <tr>
                  <td className="fw-light">Invoice Status</td>
                  <td>{data?.bl_details?.invoice_status ? data?.bl_details?.invoice_status : "N/A" }</td>
              </tr>
            </tbody>
          </table>
          <br/>
      </div>
      <div className="table-responsive col-sm-9">
          <table className="table table-bordered table-sm table-hover table-striped">
                  <thead className="bg-light">
                  <tr>
                      <th className="fw-bold">#</th>
                      <th className="fw-bold">Container No</th>
                      <th className="fw-bold">Type</th>
                      <th className="fw-bold">Type Code</th>
                      <th className="fw-bold">Seal No</th>
                      <th className="fw-bold">Status</th>
                      <th className="fw-bold">Packages</th>
                      <th className="fw-bold">Net Weight</th>
                      <th className="fw-bold">Gross Weight</th>
                      <th className="fw-bold">Yard</th>
                      <th className="fw-bold">Yard Out</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data?.bl_details?.container_details?.map((container, index) => (
                       <tr key={index}>
                      <td className="fw-light">{index+1}</td>
                      <td className="fw-light">{container?.container_no}</td>
                      <td className="fw-light">{container?.container_type}</td>
                      <td className="fw-light">{container?.container_type_code}</td>
                      <td className="fw-light">{container?.seal_no}</td>
                      <td className="fw-light">{container?.container_status}</td>
                      <td className="fw-light text-end">{container?.no_of_pkgs}</td>
                      <td className="fw-light text-end">{container?.nett_weight}</td>
                      <td className="fw-light text-end">{container?.gross_weight}</td>
                      <td className="fw-light">{container?.yard_in}</td>
                      <td>{container?.yard_out}</td>
                          </tr>
                  ))}
                  </tbody>
                  </table>
                  {data?.ts_details?.ts==true ?
    <div className="table-responsive col-sm-12">
            <table className="table table-bordered table-sm table-hover table-striped align-middle ">
                <tr>
                    <td className="fw-bold" colspan="6">TRANSHIPMENT CONNECTION DETAILS</td>
                </tr>
                <tr>
                    <td className="fw-bold">Status</td>
                    <td className="fw-bold">Vessel</td>
                    <td className="fw-bold">Voyage</td>
                    <td className="fw-bold">Voyage Date</td>
                    <td className="fw-bold">POL</td>
                    <td className="fw-bold">POD</td>
                </tr>
                <tbody>
                <tr>
                    <td>{data?.ts_details?.ts_status}</td>
                    <td>{data?.ts_details?.ts_vessel}</td>
                    <td>{data?.ts_details?.voyage}</td>
                    <td>{data?.ts_details?.voyage_date}</td>
                    <td>{data?.ts_details?.ts_pol}</td>
                    <td>{data?.ts_details?.ts_pod}</td>
                </tr>
                </tbody>
            </table>
            <br/>
        </div>
  : null}
          </div>
        
    </div>  
    </div>  : null}
       
    </div>  
    </div>  
    </div>  
  </>)
  }
  export default Home
