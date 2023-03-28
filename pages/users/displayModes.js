
const editprofile = <form className="container" >
<div className='card-body'>
  <div className='container'>
    <div className='row d-flex justify-content-center py-5'>
      <div className='col-xl-1 col-lg-2 col-md-2 col-sm-3 p-5 p-sm-0 d-flex align-items-center'>
        <img className={styles.cardimg} src={imgurl}></img>
      </div>
      <div className='col-lg-4'>
        <div className='container'>
          <div className='row my-2'>
            <div className='col-6'>
              <b>Username:</b>
            </div>
            <div className='col-6 '>
              <input type="text" name="username" defaultValue={data.username} />
            </div>
          </div>
         
          <div className='row my-2'>
            <div className='col-6'>
              <b>Email:</b>
            </div>
            <div className='col-6'>
              <input type="email" name="email" defaultValue={data.email} />
            </div>
          </div>
          
          <div className='row my-2'>
            <div className='col-6'>
              <b>Location:</b>
            </div>
            <div className='col-6'>
              <input type="text" name="location" defaultValue={data.location} />
            </div>
          </div>
          <div className='row my-2'>
          <div className='col-6'>
              <b>Skills:</b>
          </div>
          <div className='col-6'>
       <div className="input-group my-2">
              <input type="text" className="form-control" placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
              <button className="btn btn-primary" onClick={handleAddSkill}>Add</button>
           </div>
              {data.skills.map((skill, key) => {
              return (
                  <span key={key} className="badge bg-secondary mx-1" onClick={() => handleRemoveSkill(key)}>
                  {skill}
                  <span className="ms-1 fw-bold">x</span>
                  </span>
               );
              })}
  
           </div>
          </div>
          <div className="btn shadow bg-primary" onClick={handleSave}>
            <div onClick={handleSave} className="card-body text-center text-white">
              Save
            </div>
          </div>
      
        </div>
      </div>
    </div>
  </div>
</div>
</form>

const displayprofile =  <div className="container">
<div className='card-body'>
  <div className='container'>
      <div className='row d-flex justify-content-center py-5'>
          <div className='col-xl-1 col-lg-2 col-md-2 col-sm-3 p-5 p-sm-0 d-flex align-items-center'>
              <img className={styles.cardimg} src={imgurl}></img>
          </div>
          <div className='col-lg-4'>
              <div className='container'>
                  <div className='row my-2'>
                      <div className='col-6'>
                          <b>Username:</b>
                      </div>
                      <div className='col-6 '>
                          {data.username}
                      </div>
                  </div>
                  <div className='row my-2'>
                      <div className='col-6'>
                          <b>Wallet:</b>
                      </div>
                      <div className='col-6'>
                          {data.id.slice(0,6)}...{data.id.slice(data.id.length-4)}
                      </div>
                  </div>
                  <div className='row my-2'>
                      <div className='col-6'>
                          <b>Email:</b>
                      </div>
                      <div className='col-6'>
                          {data.email}
                      </div>
                  </div>
                  <div className='row my-2'>
                      <div className='col-6'>
                          <b>Task completed:</b>
                      </div>
                      <div className='col-6'>
                          {data.tasks}
                      </div>
                  </div>
                  <div className='row my-2'>
                      <div className='col-6'>
                          <b>Location:</b>
                      </div>
                      <div className='col-6'>
                          {data.location}
                      </div>
                  </div>
                  <div className='row my-2'>
                      <div className='col-6'>
                          <b>Skills:</b>
                      </div>
                      <div className='col-6'>
                      {data.skills.map((skill,key)=>{
                          return <span key={key} className="badge bg-secondary">{skill}</span>
                      })}
                      </div>
                  </div>

                      {account?.toLowerCase()==data.id.toLowerCase()?
                      <div onClick={()=>setEdit(1)} className="btn shadow bg-primary text-center text-white ">
                      Edit profile
                  </div>:
                      <div className="btn shadow bg-primary text-center text-white " data-toggle="modal" data-target="#projectInviteModal">
                          Invite for collaboration
                      </div>
                      
                      }

              </div>
          </div>
      </div>
  </div>
</div>
</div> 

module.exports = {editprofile,displayprofile};