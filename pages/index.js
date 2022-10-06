import axios from 'axios'
import { useState, useEffect } from 'react'
import NavBar from "./components/NavBar";

function Home () {
  const [bl_no, setBl_no] = useState('');
  const [data, setData] = useState([]);
  const [api, setApi] = useState([]);
  function getBranchApi() {
    axios.get(`http://infoshipco.net/msa_soc/api/get_branches.php?request=branches`)
        .then((res) => {
            setApi(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    useEffect (() => {
        getBranchApi();
      }, []);
      console.log(api);
  function getBl() {
    //clear the data
    setData([]);
    api.map((branch,item) => {
        axios.get(`${branch.api}bl_tracking.php?bl_no=${bl_no}`)
        .then(function (response) { 
            //add branch to response
            if(response.data.results_details.exists==true){
            response.data.branch = branch.branch_name;  
            //ADD EACH RESPONSE TO DATA              
            setData(data => [...data, response.data]); 
            }
            console.log('data',data)
        })
        .catch(function (error) {
            console.log(error);
        }); 
    })

  } 
  function validateBl_no(blNo) {
    if (blNo.length > 3) {
        setBl_no(blNo);
    }
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
                            onChange={e => { validateBl_no(e.target.value); }}
                        />  
                        </div>
                        <div className="col">
                            <button className="btn btn-danger" type='button' onClick={getBl}>Track BL</button>
                        </div>
                    </div>
                    </div>
            </div>
    <br/>      

  {data.length < 1  ? <div className="alert alert-danger text-center" role="alert">BL NOT FOUND {data.length}</div> :
     data.map((item, index) => (
  <div className="card-body" key={index}>
      <div className="bg-secondary text-white p-1 mb-2">{item?.branch} BRANCH </div>
      <div className="row">
      <div className="table-responsive col-sm-3">
          <table className='table table-bordered table-hover table-sm table-striped'>
            <thead></thead>
          <tbody>
              <tr>
                  <td className="fw-light">BL No</td>
                  <td>{item?.bl_details?.bl_no }</td>
              </tr>
                   <tr>
                      <td className="fw-light">Vessel Status</td>
                      <td>{item?.bl_details?.vessel_status==1 ? <span className="text-success fw-bold">SAILED</span> : <span className="text-danger fw-bold">NOT SAILED</span> }</td>
                  </tr>
                  <tr>
                      <td className="fw-light">Date Of Issue</td>
                      <td>{item?.bl_details?.date_of_issue }</td>
                  </tr>
               <tr>
                  <td className="fw-light">BL Status</td>
                  <td><span className="fw-bold">{item?.bl_details?.surrender_status }</span></td>
              </tr>
              <tr>
                  <td className="fw-light">Vessel</td>
                  <td>{item?.bl_details?.vessel }</td>
              </tr>
              <tr>
                  <td className="fw-light">Voyage</td>
                  <td>{item?.bl_details?.voyage } </td>
              </tr>
              <tr>
                  <td className="fw-light">ETD</td>
                  <td>{item?.bl_details?.voyage_date }</td>
              </tr>
              <tr>
                  <td className="fw-light">Port Of Loading</td>
                  <td>{item?.bl_details?.pol }</td>
              </tr>
              <tr>
                  <td className="fw-light">Port Of Discharge</td>
                  <td>{item?.bl_details?.pod }</td>
              </tr>
              <tr>
                  <td className="fw-light">Terminal</td>
                  <td>{item?.bl_details?.terminal ? item?.bl_details?.terminal : 'N/A'}</td>
              </tr>
              <tr>
                  <td className="fw-light">Invoice Status</td>
                  <td>{item?.bl_details?.invoice_status ? item?.bl_details?.invoice_status : "N/A" }</td>
              </tr>
            </tbody>
          </table>
          <br/>
      </div>
      <div className="col-sm-9">
        <div className='table-responsive'> 
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
                  {item?.bl_details?.container_details?.map((container, index) => (
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
                </div>
                  {item?.ts_details?.ts==true ?
    <div className="table-responsive col-sm-12">
            <table className="table table-bordered table-sm table-hover table-striped align-middle ">
                <thead className="bg-light">
                <tr>
                    <td className="fw-bold" colSpan="6">TRANSHIPMENT CONNECTION DETAILS</td>
                </tr>
                <tr>
                    <td className="fw-bold">Status</td>
                    <td className="fw-bold">Vessel</td>
                    <td className="fw-bold">Voyage</td>
                    <td className="fw-bold">Voyage Date</td>
                    <td className="fw-bold">POL</td>
                    <td className="fw-bold">POD</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{item?.ts_details?.ts_status}</td>
                    <td>{item?.ts_details?.ts_vessel}</td>
                    <td>{item?.ts_details?.voyage}</td>
                    <td>{item?.ts_details?.voyage_date}</td>
                    <td>{item?.ts_details?.ts_pol}</td>
                    <td>{item?.ts_details?.ts_pod}</td>
                </tr>
                </tbody>
            </table>
            <br/>
        </div>
  : null}
          </div>
        
    </div>  
    </div>)) }
       
    </div>  
    </div>  
    </div>  
  </>)
  }
  export default Home
