import React, { useEffect } from 'react'
import { Table, DownloadButton } from './Styles'
import { createDataSet } from '@functions/customfuncs'

const dataSetData = [
    createDataSet(
        'Abdominal and Direct Fetal ECG Database',
        'https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip'
    ),
    createDataSet(
        'AF Termination Challenge Database',
        'https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip'
    ),
    createDataSet(
        'AHA Database Sample Excluded Record',
        'https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip'
    ),
    createDataSet(
        'ANSI/AAMI EC13 Test Waveforms',
        'https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip'
    ),
    createDataSet(
        'Apnea-ECG Database',
        'https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip'
    ),
    createDataSet(
        'A Pressure Map Dataset for In-bed Posture Classification',
        'https://physionet.org/static/published-projects/pmd/a-pressure-map-dataset-for-in-bed-posture-classification-1.0.0.zip'
    ),
    createDataSet(
        'BIDMC Congestive Heart Failure Database',
        'https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip'
    ),
    createDataSet(
        'BIDMC PPG and Respiration Dataset',
        'https://physionet.org/static/published-projects/bidmc/bidmc-ppg-and-respiration-dataset-1.0.0.zip'
    )
]

const DataSetTable: React.FC = () => {
    interface DataSetRowProps {
        title: string
        link: string
    }
    const DataSetTableTopRow: React.FC = () => {
        return (
            <tr>
                <th className="left">Title</th>
                <th className="right">Download</th>
            </tr>
        )
    }
    const DataSetTableRow: React.FC<DataSetRowProps> = ({ title, link }) => {
        return (
            <tr>
                <td className="left">{title}</td>
                <td className="right">
                    <DownloadButton href={link} download>
                        Download
                    </DownloadButton>
                </td>
            </tr>
        )
    }
    return (
        <Table>
            <thead>
                <DataSetTableTopRow />
            </thead>
            <tbody>
                {dataSetData.map((item, idx) => {
                    return (
                        <DataSetTableRow
                            title={item.title}
                            link={item.link}
                            key={`${idx}-dataset-item`}
                        />
                    )
                })}
            </tbody>
        </Table>
    )
}

export default DataSetTable
