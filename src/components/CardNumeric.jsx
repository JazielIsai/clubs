import React from 'react'

export const CardNumeric = ({ numeric = '10', description = 'description', icon, styles = {} }) => {
  return (
    <div class="col-xl-3 col-sm-6 col-12" style={styles}>
        <div class="card">
            <div class="card-content">
                <div class="card-body">
                    <div class="row ">
                        <div class="col-4">
                            {icon}
                        </div>
                        <div class="col-8">
                            <div className='me-3' style={{textAlign: 'end'}}>
                                <h3 className=''>{numeric}</h3>
                                <span className=''>{description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
