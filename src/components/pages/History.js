import React, { useState } from 'react';
import './History.css';
import HistoryCard from '../HistoryCard';
import { Modal, Upload } from 'antd';
import RoleButton from '../RoleButton';
import axios from '../../configs/axios';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function History() {
  // const [previewVisible, setPreviewVisible] = useState(false)
  // const [previewImage, setPreviewImage] = useState('')
  // const [previewTitle, setPreviewTitle] = useState('')
  // const [fileList, setFileList] = useState([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-2',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-3',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-4',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-5',
  //     name: 'image.png',
  //     status: 'error',
  //   },
  // ])

  // const handleCancel = () => this.setState({ previewVisible: false });

  // const handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   setPreviewImage(file.url || file.preview)
  //   setPreviewVisible(true)
  //   setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  // };

  // const handleChange = async({ fileList }) => {
  //   setFileList(fileList);
  //   const data = new FormData();
  //   data.append('file', fileList[0]);
  //   data.append('upload_preset', 'preset-rider');

  //   const body = data
  //   const res = await axios.post('https://api.cloudinary.com/v1_1/deaghhlei/image/upload', body)

  //   const file = await res.json();
    
  // }

  const uploadButton = (
    <div>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className='history'>
      <div className='App__heading'>
        <h2>Trip  History</h2>
      </div>
      <div className='history__display'>
        <RoleButton />
        <HistoryCard name='Shinzo Abe' from='Siam' to='Silom' dateTime='Friday 55555555' carModel='Tesla T' price='300' result='Deny' />
        <button className='App__button App__button--red'>Back</button>

        {/* <form action="">
          <div className="clearfix">
            <Upload
              action="https://api.cloudinary.com/v1_1/deaghhlei/image/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </form> */}
      </div>
    </div>
  )
}

export default History;