const mongoose = require('mongoose');
let batch = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    BatchID:Number,     
    BatchSize:Number,  
    AmountSoldTOCustomer:Number,  
    BatchDescription:String,     
    ProductTemplateID:Number,   
    FactoryID:String,
    DistributorID:String,
    FactoryLocation:String,
    DateOfProduction:String,
    State: Number,
    DistributorScanned: Boolean,
    DistributorScannedTimeStamp: String,
    AmountLeftForSellingTORetailer:Number,
    CompanyBatchID:Number,
    ProductIDs:[Number]
})
module.exports=mongoose.model('batch',batch)    


// Reed et al

// @inproceedings{reed2016learning,
//     title={Learning deep representations of fine-grained visual descriptions},
//     author={Reed, Scott and Akata, Zeynep and Lee, Honglak and Schiele, Bernt},
//     booktitle={Proceedings of the IEEE conference on computer vision and pattern recognition},
//     pages={49--58},
//     year={2016}
//   } 

//   DGSAN

//   @article{radford2015unsupervised,
//     title={Unsupervised representation learning with deep convolutional generative adversarial networks},
//     author={Radford, Alec and Metz, Luke and Chintala, Soumith},
//     journal={arXiv preprint arXiv:1511.06434},
//     year={2015}
//   }
  

// StackGAN 10

// @article{zhang2018stackgan++,
//     title={Stackgan++: Realistic image synthesis with stacked generative adversarial networks},
//     author={Zhang, Han and Xu, Tao and Li, Hongsheng and Zhang, Shaoting and Wang, Xiaogang and Huang, Xiaolei and Metaxas, Dimitris N},
//     journal={IEEE transactions on pattern analysis and machine intelligence},
//     volume={41},
//     number={8},
//     pages={1947--1962},
//     year={2018},
//     publisher={IEEE}
//   }

  
// DRAW
// @inproceedings{gregor2015draw,
//     title={Draw: A recurrent neural network for image generation},
//     author={Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo and Wierstra, Daan},
//     booktitle={International conference on machine learning},
//     pages={1462--1471},
//     year={2015},
//     organization={PMLR}
//   }

  
// AttenGAN
// @article{fang2022atten,
//     title={Atten-GAN: Pedestrian Trajectory Prediction with GAN Based on Attention Mechanism},
//     author={Fang, Fang and Zhang, Pengpeng and Zhou, Bo and Qian, Kun and Gan, Yahui},
//     journal={Cognitive Computation},
//     volume={14},
//     number={6},
//     pages={2296--2305},
//     year={2022},
//     publisher={Springer}
//   }

  
// LFW 15

// @inproceedings{liu2015deep,
//     title={Deep learning face attributes in the wild},
//     author={Liu, Ziwei and Luo, Ping and Wang, Xiaogang and Tang, Xiaoou},
//     booktitle={Proceedings of the IEEE international conference on computer vision},
//     pages={3730--3738},
//     year={2015}
//   }
  
// CelebA 16

// @article{liu2018large,
//     title={Large-scale celebfaces attributes (celeba) dataset},
//     author={Liu, Ziwei and Luo, Ping and Wang, Xiaogang and Tang, Xiaoou},
//     journal={Retrieved August},
//     volume={15},
//     number={2018},
//     pages={11},
//     year={2018}
//   }
  
// ProGAN 17
// @article{karras2017progressive,
//     title={Progressive growing of gans for improved quality, stability, and variation},
//     author={Karras, Tero and Aila, Timo and Laine, Samuli and Lehtinen, Jaakko},
//     journal={arXiv preprint arXiv:1710.10196},
//     year={2017}
//   }
  
// StyleGAN 18
// @inproceedings{karras2019style,
//     title={A style-based generator architecture for generative adversarial networks},
//     author={Karras, Tero and Laine, Samuli and Aila, Timo},
//     booktitle={Proceedings of the IEEE/CVF conference on computer vision and pattern recognition},
//     pages={4401--4410},
//     year={2019}
//   }

// AkaniMAX 19

// MSG-GAN 20

// @inproceedings{karnewar2020msg,
//     title={Msg-gan: Multi-scale gradients for generative adversarial networks},
//     author={Karnewar, Animesh and Wang, Oliver},
//     booktitle={Proceedings of the IEEE/CVF conference on computer vision and pattern recognition},
//     pages={7799--7808},
//     year={2020}
//   }

  
// TextToFaceGAN 21
// @inproceedings{nasir2019text2facegan,
//     title={Text2facegan: Face generation from fine grained textual descriptions},
//     author={Nasir, Osaid Rehman and Jha, Shailesh Kumar and Grover, Manraj Singh and Yu, Yi and Kumar, Ajit and Shah, Rajiv Ratn},
//     booktitle={2019 IEEE Fifth International Conference on Multimedia Big Data (BigMM)},
//     pages={58--67},
//     year={2019},
//     organization={IEEE}
//   }
  
// FTGAN 23
// @article{chen2019ftgan,
//     title={FTGAN: A fully-trained generative adversarial networks for text to face generation},
//     author={Chen, Xiang and Qing, Lingbo and He, Xiaohai and Luo, Xiaodong and Xu, Yining},
//     journal={arXiv preprint arXiv:1904.05729},
//     year={2019}
//   }

// Char-CNN-RNN 8
// TTF-HD 25

// @inproceedings{wang2021faces,
//     title={Faces a la carte: Text-to-face generation via attribute disentanglement},
//     author={Wang, Tianren and Zhang, Teng and Lovell, Brian},
//     booktitle={Proceedings of the IEEE/CVF winter conference on applications of computer vision},
//     pages={3380--3388},
//     year={2021}
//   }


