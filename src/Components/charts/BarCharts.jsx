import React from 'react'
import {Pie,Doughnut,Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto'
function BarCharts() {

    return (
      <div className="container">
        <div className="row justify-content-center align-items-center mt-3">
        <div className="col-lg-5 col-md-12 mb-5">
          <Bar
              data={{
                  labels:['Todo','Inprogress','Completed'],
                  datasets:[{
                      label: 'status of tasks',
                      data: [12, 19, 3],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1
                  }],
              }}
              height = {250}
              width = {200}
              options={{
                maintainAspectRatio:false,
              }}
            /> 
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="row flex-wrap">
            <div className="col-12 mb-5">
              <Pie
                data={{
                    labels:['Todo','Inprogress','Completed'],
                    datasets:[{
                        label: 'status of tasks',
                        data: [12, 19, 3],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.5)',
                          'rgba(54, 162, 235, 0.5)',
                          'rgba(75, 192, 192, 0.5)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1
                    }],
                }}
                height = {400}
                width = {400}
                options={{
                  maintainAspectRatio:false,
                }}
              /> 
            </div>
              <div className="col-12">
                <Doughnut
                    data={{
                        labels:['Todo','Inprogress','Completed'],
                        datasets:[{
                            label: 'status of tasks',
                            data: [12, 19, 3],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.5)',
                              'rgba(54, 162, 235, 0.5)',
                              'rgba(75, 192, 192, 0.5)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1
                        }],
                    }}
                    height = {400}
                    width = {400}
                    options={{
                      maintainAspectRatio:false,
                    }}
                  /> 
              </div>
            </div>
          </div> 
        </div>
      </div>
        
    )
}

export default BarCharts
