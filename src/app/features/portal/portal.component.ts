import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SMMaterialModule } from '../../webapp-common/shared/material/material.module'
import {ICONS} from '@common/constants';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { style } from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import {CartService} from '~/shared/services/cart.service'
import { error, log } from 'console';
import { MatAccordion } from '@angular/material/expansion';




export interface tags {
  name: string;
}

declare var LeaderLine: any;

@Component({
  // standalone:true,
  selector: 'sm-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class PortalComponent implements OnInit {  
  @ViewChild('panel1', { static: true }) panel1: ElementRef;

  // readonly ICONS = ICONS;
  isPanelOpen = false;
  dataSetId: any;
  abc: any;
  name: any;
  id: any;
  data_name: any;
  version: any;
  desc: any;
  view_url: any;
  run_url: any;
  panelOpenState:boolean;
  panelOpenState1:boolean;
  panelOpenState2:boolean;
  panelOpenState3:boolean;
  panelOpenState4:boolean;
  
  ab: any = [];
  selectedApps: any;
  Array: any = [];
  Modules: any = [];
  Dataset: any = [];
  Engin: any = [];
  Frontend: any = [];
  Solution: any = [];
  Searchvalue: string = '';
  Searchdata: string = 'datasetName';
  Searchvalue1: string = '';
  Searchdata1: string = 'modelName';
  Searchvalue2: string = '';
  Searchdata2: string = 'pipelineName';
  Searchvalue3: string = '';
  Searchdata3: string = 'frontendName';
  Searchvalue4: string = '';
  Searchdata4: string = 'solutionName';
  Searchdata5:string='solutionTags';
  ishidden: boolean = false;
  selectedIndex: number = 0;
  filled: boolean = false;
  selected:boolean=false;
  // tags:tags[]=[{name:'tag1'},{name:'tag2'}];
  // drop(event: CdkDragDrop<tags[]>) {
  //   moveItemInArray(this.tags, event.previousIndex, event.currentIndex);
  // }

  innerHeight: any;
    innerWidth: any;


  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private toastr: ToastrService,

    private cartService:CartService) { 
    this.innerHeight = (window.screen.height) + "px";
    this.innerWidth = (window.screen.width) + "px";
    console.log(this.innerHeight);
    console.log(this.innerWidth);
  }
  
  ngOnInit(): void {
    // this.fetchData();
    this.getModel();
    this.getdataset();
    this.getPipeline();
    this.getFrontend();
    this.getSolution();
   
   this.isPanelOpen;
  
 //------------------------------------------------------------------------------------------------ 
}

sectionData(){
    this.groupedData = {};
    this.Modules.forEach((item) => {
    const section = item.modelSeperator.toUpperCase();
      if (!this.groupedData[section]) {
      this.groupedData[section] = [];
    }
    this.groupedData[section].push(item);
  });
    this.sections = Object.keys(this.groupedData);
}

openHtmlFile() {
  window.open('./static/index.html', '_blank');
}
  groupedData:any;
  sections:any=[];
  // Test_model:any=[
  //   {id:1,modelDescription:"Model test desc",modelName:"Model Test Retail",domain:"Retail"},
  //   {id:2,modelDescription:"Model test desc",modelName:"Model Test Healthcare",domain:"Healthcare"},
  //   {id:3,modelDescription:"Model test desc",modelName:"Model Test Healthcare",domain:"Healthcare"},
  //   {id:4,modelDescription:"Model test desc",modelName:"Model Test Retail",domain:"Retail"},
  //   {id:5,modelDescription:"Model test desc",modelName:"Model Test Healthcare",domain:"Healthcare"} ,
  //   {id:6,modelDescription:"Model test desc",modelName:"Model Test Finance",domain:"Finance"}  
  // ]

  // ----------------For on open panel lines position handle---------------------

  // idx:any;
  // onPanelOpened(data:any,state:any) {
    
  //   if(state=='opened'){
  //     this.panelOpenState=true;
  //   }else{
  //     this.panelOpenState=false;
  //   }
   
  //   if(this.link){
  //     if(data.frontendName){
  //       this.idx=this.Frontend.indexOf(data);
  //     }else if(data.pipelineName){
  //       this.idx=this.pipeline.indexOf(data);
  //     }else if(data.modelName){
  //       this.idx=this.Modules.indexOf(data);
  //     }else if(data.datasetName){
  //       this.idx=this.Dataset.indexOf(data);
  //     }
      
  //     this.updateArrows(data);
  //   }
  // }
//---------------------------------------------------------------------------------

 // 3.111.229.37
   callCarddata(){
  //   this.http.get("http://3.111.229.37:3000/clearml/dataset").subscribe(response => { 
    
  //   })http://3.111.229.37/   13.234.148.242
   }
  callCardpipeline(){
    // this.http.get("http://3.111.229.37:3000/clearml/pipeline").subscribe(response => { 
    
    // })
  }
  arrowLink2:any;
  arrowLink3:any;
  arrowLink4:any;
  arrowLink5:any;
  arrowLink6:any;
  arrowLink7:any;
  arrowLink8:any;
  arrowLink9:any;
  arrowLink10:any;
  arrowLink11:any;
  arrowLink12:any;
  arrowLink13:any;

  rows1:any;
  rows2:any;
  rows3:any;
  rows4:any;
  rows5:any;
  searchResponse:any;

  truncateText(text: string, limit: number){
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }

  filterSolution() { 
    let search = this.Searchvalue4;
    let table =  "Solutions"; 
    
    // let col1=  "solutionName";
    // let col2 = "solutionTags";
    this.http.post('http://3.111.229.37:3000/search', { search, table})
      .subscribe(response => { 
        debugger 
        this.searchResponse=response;
        this.Solution = this.searchResponse.data;
        console.log("search Response",this.searchResponse.data)
      }
      )
  }

  filterFrontend() {
    let search = this.Searchvalue3;
    let table =  "Frontends"; 
    // let col1=  "frontendName";
    this.http.post('http://3.111.229.37:3000/search', { search, table})
      .subscribe(response => {  
        this.searchResponse=response;
        this.Frontend = this.searchResponse.data;
        console.log("search Response",this.searchResponse.data)
      }
      )
  }

  filterPipeline() {
    let search = this.Searchvalue2;
    let table =  "Pipelines"; 
    // let col1=  "pipelineName";
    // let col2 = "pipelineTags";
    this.http.post('http://3.111.229.37:3000/search', { search, table})
      .subscribe(response => {  
        this.searchResponse=response;
        this.pipeline = this.searchResponse.data;
        console.log("search Response",this.searchResponse.data)
      }
      )
  }

  filterModel() {
    
    let search = this.Searchvalue1;
    let table =  "Models"; 
    // let col1=  "modelName";
    // let col2 = "modelTags";
    this.http.post('http://3.111.229.37:3000/search', { search, table})
      .subscribe(response => {  
        debugger
        this.searchResponse=response;
        this.Modules = this.searchResponse.data;
        this.sectionData();
        console.log("search ResponseModel",this.searchResponse.data)
      }
      )
  }

  filterData() {
    let search = this.Searchvalue;
    let table =  "Data"; 
    // let col1=  "datasetName";
   
    this.http.post('http://3.111.229.37:3000/search', { search, table})
      .subscribe(response => {  
        this.searchResponse=response;
        this.Dataset = this.searchResponse.data;
        console.log("search ResponseData",this.searchResponse.data)
      }
      )
  }


  refresh(){
    // this.updateArrows('remove')
    this.getModel();
    this.getSolution();
    this.getdataset();
    this.getPipeline();
    this.getFrontend();
    this.linkCheck();
    this.isPanelOpen=false;
    this.selected=false;
  }
  
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'modelName',
    selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };
  dropdownSettings1 = {
    singleSelection: false,
    idField: 'id',
    textField: 'datasetName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  dropdownSettings2 = {
    singleSelection: false,
    idField: 'id',
    textField: 'pipelineName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  dropdownSettings3 = {
    singleSelection: false,
    idField: 'id',
    textField: 'frontendName',
    selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  dropdownList = [];
 

  onItemSelect(data: any,jars:any) {
   debugger
    if(jars=='dataset'){
      this.dropdowndata.push(data.id);
      // this.dropdowndata=data;  
    }else if(jars=='model'){
      this.dropdownmodel.push(data.id);
      // this.dropdownmodel=data; 
    }else if(jars=='pipeline'){
      this.dropdownpipeline.push(data.id);
      // this.dropdownpipeline=data;  
    }else if(jars=='frontend'){
      this.dropdownfrontend.push(data.id);
      // this.dropdownfrontend=data;
    }

  }
  
  unselect(data:any,jars:any){
    debugger
    let solutionId = this.formdata7.controls['solution_id'].value.toString();
    
    if(jars=='dataset'){
      let dataId=data.id.toString();
      // this.editdropdowndata.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, dataId})
      .subscribe(response => {  
        this.storeResponse=response;
        alert(this.storeResponse.message);
      }
      )
     
    }else if(jars=='model'){
      let modelId=data.id.toString();
      // this.editdropdownmodel.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, modelId})
      .subscribe(response => { 
        this.storeResponse=response;
        alert(this.storeResponse.message);
       
      }
      )
     
    }else if(jars=='pipeline'){
      let pipelineId=data.id.toString();
      // this.editdropdownpipeline.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, pipelineId})
      .subscribe(response => {
        this.storeResponse=response;
        alert(this.storeResponse.message);
       
      }
      )
      
    }else if(jars=='frontend'){
      let frontendId=data.id.toString();
      // this.editdropdownfrontend.push((data.id).toString());
      this.http.post('http://3.111.229.37:3000/solution/deleteDynamic', { solutionId, frontendId})
      .subscribe(response => {
        this.storeResponse=response;
        alert(this.storeResponse.message);
       
      }
      )
    }
    
  }

 
  onEditItemSelect(data: any,jars:any) {
    debugger
     if(jars=='dataset'){
       this.editdropdowndata.push((data.id).toString());
       // this.dropdowndata=data;
      
     }else if(jars=='model'){
       this.editdropdownmodel.push((data.id).toString());
       // this.dropdownmodel=data;
      
     }else if(jars=='pipeline'){
       this.editdropdownpipeline.push((data.id).toString());
       // this.dropdownpipeline=data;
       
     }else if(jars=='frontend'){
       this.editdropdownfrontend.push((data.id).toString());
       // this.dropdownfrontend=data;
     }
 
   }
 
 
// -----------------------------------------------

  formdata = this.formBuilder.group({
    type: [],
    name: [,Validators.required],
    id: [,Validators.required],
    version: [,Validators.required],
    desc: [,Validators.required],
    url: [,Validators.required],
    dataset_tag:[,Validators.required],
    // data_type:[]
  })
  formdata4 = this.formBuilder.group({
    name: [],
    version: [],
    desc: [],
    id: [],
    url:[],
    main_id:[],
    dataset_tag:[],
    // data_type:[]
   
  })
  formdata1 = this.formBuilder.group({
    dataset_name: ['', Validators.required],
    dataset_project: ['', Validators.required],
    dataset_id: [],
    version: [],
    description: []
  })
  formdata2 = this.formBuilder.group({
    project_name: ['', Validators.required],
    view_url: ['', Validators.required],
    run_url: ['', Validators.required],
    model_tags:[''],
    separator:['', Validators.required],
    desc:['', Validators.required],
  })
  formdata6 = this.formBuilder.group({
    project_name: [],
    id: [],
    desc:[],
    view_url:[],
    run_url:[],
    modelTags:[],
    modelseparator:[]
  })


  formdata3 = this.formBuilder.group({
    solution_name: ['', Validators.required],
    view_url: ['', Validators.required],
    solution_tags: ['', Validators.required],
    solution_description: ['', Validators.required],
    run_url:['', Validators.required]
  })
  
 
  
  formdata7 = this.formBuilder.group({
    solution_name: [],
    solution_description: [],
    solution_tags: [],
    solution_id:[],
    solution_version:[],
    run_url:[],
    view_url:[],
    linkedarray:[],
    linkeddata:[],
    linkedpipeline:[],
    linkedfrontend:[]
  })
  formdata8 = this.formBuilder.group({
    pipeline_name:['', Validators.required],
    pipelineView_url:['', Validators.required],
    pipeline_description:['', Validators.required],
    pipeline_tags:['', Validators.required],
    id:[]
  })
  formdata9=this.formBuilder.group({
    frontend_name:['', Validators.required],
    frontendStyle_url:['', Validators.required],
    frontendRun_url:['', Validators.required],
    frontend_description:['', Validators.required],
    id:[]
  })
  storeResponse: any;
  pipeline:any=[];
  // ------------------------------Model  jar section-------------------------------
  addModel() {
    
    let modelName = this.formdata2.controls['project_name'].value;
    let modelViewUrl = this.formdata2.controls['view_url'].value;
    let modelRunUrl = this.formdata2.controls['run_url'].value;
    let modelTags = this.formdata2.controls['model_tags'].value;
    let modelSeperator=this.formdata2.controls['separator'].value;
    let modelDescription = this.formdata2.controls['desc'].value;
    this.http.post('http://3.111.229.37:3000/model/insertModel', { modelName, modelViewUrl, modelRunUrl, modelTags,modelSeperator, modelDescription })
      .subscribe(response => {
        this.formdata2.reset();
        console.log(response);
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getModel();
      },err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
      )
  }
  editModel() {
    debugger
    let modelName = this.formdata6.controls['project_name'].value;
    let modelId = this.formdata6.controls['id'].value.toString();
    let modelTags = this.formdata6.controls['modelTags'].value;
    let modelDescription = this.formdata6.controls['desc'].value;
    let modelRunUrl = this.formdata6.controls['run_url'].value;
    let modelViewUrl = this.formdata6.controls['view_url'].value;
    let modelSeperator=this.formdata6.controls['modelseparator'].value;
    this.http.post('http://3.111.229.37:3000/model/editModel', { modelName, modelTags, modelId, modelDescription, modelRunUrl, modelViewUrl,modelSeperator })
      .subscribe(response => {

        console.log("res", response);
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  modelId:any;
  deleteModel() {
    
    let modelId=this.modelId;

    this.http.post('http://3.111.229.37:3000/model/deleteModel', { modelId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getModel();
      }
      )
  }
  dumbb: any;
  dumbb1: any;
  dumbb2: any;

  getModel() {
    this.http.post('http://3.111.229.37:3000/model/retrieveModels', {})
      .subscribe(response => {
        this.dumbb = response;
        this.Modules = this.dumbb.data;
        console.log(this.Modules);
        this.groupedData=[];
        this.sections=[];
        this.sectionData();
      }
      )
  }
// ------------------------------dataset section-------------------------------


  addDataset() {
   debugger
    let datasetName = this.formdata.controls['name'].value;
    let datasetId = this.formdata.controls['id'].value;
    let datasetVersion = this.formdata.controls['version'].value;
    let datasetDescription = this.formdata.controls['desc'].value;
    let datasetUrl = this.formdata.controls['url'].value;
    let datasetTags=this.formdata.controls['dataset_tag'].value;
    let datasetType='';
    this.http.post('http://3.111.229.37:3000/data/insertData', {datasetUrl, datasetName, datasetId, datasetVersion,datasetTags,datasetType, datasetDescription })
      .subscribe(response => {
        debugger
        this.formdata.reset();
        console.log(response)
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert(this.storeResponse.message);
        this.getdataset();
      },err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
      );
  }
  editDataset() {
    debugger
    let datasetName = this.formdata4.controls['name'].value;
    let datasetVersion = this.formdata4.controls['version'].value;
    let datasetDescription = this.formdata4.controls['desc'].value;
    let datasetUrl = this.formdata4.controls['url'].value;
    let datasetTags=this.formdata4.controls['dataset_tag'].value;
    let datasetType='';
    let datasetId =this.formdata4.controls['id'].value.toString(); //unique dataset Id 
    let id = this.formdata4.controls['main_id'].value.toString(); // unique primery key generated by DB
    
   

    // console.log("datasetId", datasetName, datasetId, datasetVersion, datasetDescription)
    this.http.post('http://3.111.229.37:3000/data/editDataset', { datasetName, datasetId, datasetVersion, datasetDescription,datasetTags,datasetType, datasetUrl })
      .subscribe(response => {
        debugger
        console.log(response)
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getdataset();
      }
      );
  }
  datasetId:any;
  deleteDataset() {

    let datasetId=this.datasetId;

    this.http.post('http://3.111.229.37:3000/data/deleteDataset', { datasetId })
      .subscribe(response => {
        debugger
        console.log(response)
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getdataset();
      }
      );
  }
  getdataset() {
    this.http.post('http://3.111.229.37:3000/data/retrieveDatasets', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.Dataset = this.dumbb1.data;
        console.log("abc", this.Dataset);
      }
      )
  }
// --------------------------------Pipeline Section---------------------------------
  addPipeline(){
  
    let pipelineName=this.formdata8.controls['pipeline_name'].value;
    let pipelineViewUrl=this.formdata8.controls['pipelineView_url'].value;
    let pipelineTags=this.formdata8.controls['pipeline_tags'].value;
    let pipelineDescription=this.formdata8.controls['pipeline_description'].value;
    
    this.http.post('http://3.111.229.37:3000/pipeline/insertPipeline', {pipelineName,pipelineViewUrl,pipelineTags,pipelineDescription })
      .subscribe(response => {
        this.formdata8.reset();
        console.log(response)
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert(this.storeResponse.message);
        this.getPipeline();
      },err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
      );
  }
  getPipeline(){
    this.http.post('http://3.111.229.37:3000/pipeline/retrievePipelines', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.pipeline = this.dumbb1.data;
        console.log("pipeline", this.pipeline);
        
      }
      )
  }

  editPipeline() {

    let pipelineId=this.formdata8.controls['id'].value;
    let pipelineName=this.formdata8.controls['pipeline_name'].value;
    let pipelineViewUrl=this.formdata8.controls['pipelineView_url'].value;
    let pipelineTags=this.formdata8.controls['pipeline_tags'].value;
    let pipelineDescription=this.formdata8.controls['pipeline_description'].value;
    
    this.http.post('http://3.111.229.37:3000/pipeline/editPipeline', { pipelineId,pipelineName,pipelineViewUrl,pipelineTags,pipelineDescription})
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getPipeline();
      });
  }

  pipelineId:any;
  frontendId:any;

  deletePipeline(){
   
    let pipelineId=this.pipelineId
    this.http.post('http://3.111.229.37:3000/pipeline/deletePipeline', { pipelineId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getPipeline();
      }
      )
  }
// ------------------------------Frontend Jar-------------------------------
  addFrontend(){
   debugger
    let frontendName=this.formdata9.controls['frontend_name'].value;
    let frontendStylesUrl=this.formdata9.controls['frontendStyle_url'].value;
    let frontendRunUrl=this.formdata9.controls['frontendRun_url'].value;
    let frontendDescription=this.formdata9.controls['frontend_description'].value;

    this.http.post('http://3.111.229.37:3000/frontend/insertFrontend', {
      frontendName,
    frontendStylesUrl,
    frontendRunUrl,
    frontendDescription })
      .subscribe(response => {
        this.formdata9.reset();
        console.log(response)
        this.storeResponse = response;
        this.toastr.success(this.storeResponse.message);
        // alert();
        this.getFrontend();
      },err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
      );
  }

  getFrontend(){
    this.http.post('http://3.111.229.37:3000/frontend/retrieveFrontends', {})
      .subscribe(response => {
        this.dumbb1 = response;
        this.Frontend = this.dumbb1.data;
        console.log("Frontend", this.Frontend);
      }
      )
  }
  editFrontend(){

    let frontendName=this.formdata9.controls['frontend_name'].value;
    let frontendStylesUrl=this.formdata9.controls['frontendStyle_url'].value;
    let frontendRunUrl=this.formdata9.controls['frontendRun_url'].value;
    let frontendDescription=this.formdata9.controls['frontend_description'].value;
    let id=this.formdata9.controls['id'].value;
    
    this.http.post('http://3.111.229.37:3000/frontend/editFrontend', {id,frontendName,
    frontendStylesUrl,
    frontendRunUrl,
    frontendDescription})
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.warning(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getFrontend();
      });

  }
deleteFrontend(){
  
  let id=this.frontendId;
    this.http.post('http://3.111.229.37:3000/frontend/deleteFrontend', { id })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        this.toastr.error(this.storeResponse.message);
        // alert(this.storeResponse.message)
        this.getFrontend();
      })
}
  //------------------------------unknow-------------------------------
  getData(data: any) {
    console.log("clicked", data)
    this.abc = data
    console.log("abcName", this.abc.id)
    this.formdata4.controls['main_id'].setValue(data.id);
    this.formdata4.controls['name'].setValue(data.datasetName);
    this.formdata4.controls['version'].setValue(data.datasetVersion);
    this.formdata4.controls['desc'].setValue(data.datasetDescription);
    this.formdata4.controls['url'].setValue(data.datasetUrl);
    this.formdata4.controls['id'].setValue(data.datasetId);
    this.formdata4.controls['dataset_tag'].setValue(data.datasetTags);
    this.formdata4.controls['data_type'].setValue(data.datasetType);
    this.formdata4.controls['id'].disable();
  }
  getDataModel(data: any) {
    console.log("clicked", data)
    this.formdata6.controls['project_name'].setValue(data.modelName);
    this.formdata6.controls['id'].setValue(data.modelId)
    this.formdata6.controls['desc'].setValue(data.modelDescription);
    this.formdata6.controls['run_url'].setValue(data.modelRunUrl);
    this.formdata6.controls['view_url'].setValue(data.modelViewUrl);
    this.formdata6.controls['modelTags'].setValue(data.modelTags);
    this.formdata6.controls['modelseparator'].setValue(data.modelSeperator);
  }
  
  selectedValues:any;
  selectedValues1:any;
  selectedValues2:any;
  selectedValues3:any;
  // selectedIds:any;
   dropdownSettingsmodel:any
   dropdownSettingsdata:any
   dropdownSettingspipeline:any
   dropdownSettingsfrontend:any

  getDataSolution(data:any){
  debugger
    // console.log("clickedsolution", data)
    this.formdata7.controls['solution_name'].setValue(data.solutionName)
    // this.formdata7.controls['solution_version'].setValue(data.solutionVersion)
    this.formdata7.controls['solution_id'].setValue(data.id)
    this.formdata7.controls['solution_tags'].setValue(data.solutionTags)
    this.formdata7.controls['solution_description'].setValue(data.solutionDescription)
    this.formdata7.controls['view_url'].setValue(data.solutionViewUrl)
    this.formdata7.controls['run_url'].setValue(data.solutionRunUrl)
    
    
    // if(data.models.length!=0){
      this.formdata7.controls['linkedarray'].setValue(data.models)
      this.selectedValues=data.models;
    // }else if(data.datasets.length!=0){
      this.formdata7.controls['linkeddata'].setValue(data.datasets)
      this.selectedValues1=data.datasets;
      debugger
    // }else if(data.frontends.length!=0){
      this.formdata7.controls['linkedfrontend'].setValue(data.frontends)
      this.selectedValues3=data.frontends;
    // }else if(data.pipelines.length!=0){
      this.formdata7.controls['linkedpipeline'].setValue(data.pipelines)
      this.selectedValues2=data.pipelines;
      debugger
    // }
    
   
    this.dropdownSettingsmodel = {
      singleSelection: false,
      selectedValues:this.selectedValues,
      idField: 'id',
      textField: 'modelName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.dropdownSettingsdata = {
      singleSelection: false,
      selectedValues:this.selectedValues1,
      idField: 'id',
      textField: 'datasetName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.dropdownSettingspipeline = {
      singleSelection: false,
      selectedValues:this.selectedValues2,
      idField: 'id',
      textField: 'pipelineName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.dropdownSettingsfrontend = {
      singleSelection: false,
      selectedValues:this.selectedValues3,
      idField: 'id',
      textField: 'frontendName',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  

  getDataPipeline(data:any){
    this.formdata8.controls['pipeline_name'].setValue(data.pipelineName)
    this.formdata8.controls['pipelineView_url'].setValue(data.pipelineViewUrl)
    this.formdata8.controls['pipeline_tags'].setValue(data.pipelineTags)
    this.formdata8.controls['pipeline_description'].setValue(data.pipelineDescription) 
    this.formdata8.controls['id'].setValue(data.pipelineId) 
  }
  getDataFrontend(data:any){
    this.formdata9.controls['frontend_name'].setValue(data.frontendName)
    this.formdata9.controls['frontendStyle_url'].setValue(data.frontendStylesUrl)
    this.formdata9.controls['frontendRun_url'].setValue(data.frontendRunUrl)
    this.formdata9.controls['frontend_description'].setValue(data.frontendDescription)
    this.formdata9.controls['id'].setValue(data.id);
  }
// ------------------------------solution jar section-------------------------------
  addSolution() {
    let solutionName = this.formdata3.controls['solution_name'].value;
    let solutionViewUrl = this.formdata3.controls['view_url'].value;
    let solutionRunUrl= this.formdata3.controls['run_url'].value;
    let soltag=this.formdata3.controls['solution_tags'].value;
    let solutionTags = soltag.toUpperCase();
    let solutionDescription = this.formdata3.controls['solution_description'].value;
    let modelId=this.dropdownmodel;
    let datasetId=this.dropdowndata;
    let pipelineId=this.dropdownpipeline;
    let frontendId=this.dropdownfrontend;
      debugger
    this.http.post('http://3.111.229.37:3000/solution/insertSolution', { solutionName, solutionViewUrl, solutionTags, solutionDescription, solutionRunUrl,modelId,datasetId,pipelineId,frontendId })
      .subscribe(response => {
        debugger
        console.log(response);
        
        this.storeResponse = response;
        // console.log(this.storeResponse.error.message);
        this.toastr.success(this.storeResponse.message);
        this.getSolution();
      },err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
      );
  }
 
  editSolution() {
    
    let solutionName = this.formdata7.controls['solution_name'].value;
    let solutionId = this.formdata7.controls['solution_id'].value.toString();
    let solutionRunUrl=this.formdata7.controls['run_url'].value;
    let solutionViewUrl=this.formdata7.controls['view_url'].value;
    let soltag=this.formdata7.controls['solution_tags'].value;
    let solutionTags = soltag.toUpperCase();
    let solutionDescription = this.formdata7.controls['solution_description'].value;
    let solutionVersion = this.formdata7.controls['solution_version'].value;
    let modelId=this.editdropdownmodel;
    let dataId=this.editdropdowndata;
    let pipelineId=this.editdropdownpipeline;
    let frontendId=this.editdropdownfrontend;
    
    // solutionTags,
    this.http.post('http://3.111.229.37:3000/solution/editSolution', {solutionId, solutionName, solutionVersion, solutionDescription, solutionRunUrl,solutionViewUrl,solutionTags,frontendId,pipelineId,modelId ,dataId})
      .subscribe(response => {
        debugger
        console.log(response);
        this.storeResponse = response;
        // alert(this.storeResponse.message)
        this.toastr.warning(this.storeResponse.message);
        this.getSolution();
      });
      
        this.getSolution();
    
      
  }

  solutionId:any;
  deleteSolution(){
debugger
   
    let solutionId=this.solutionId;

    this.http.post('http://3.111.229.37:3000/solution/deleteSolution', { solutionId })
      .subscribe(response => {
        console.log(response);
        this.storeResponse = response;
        // alert(this.storeResponse.message)
        this.toastr.error(this.storeResponse.message);
        this.getSolution();
      }
      )
  }

  linkedassets:any=[];
  linkedassets1:any=[];

  valuesArray: any[] = [];
  TagsArray: any[] = [];
  getSolution() {
    this.http.post('http://3.111.229.37:3000/solution/retrieveSolutions', {})
      .subscribe(response => {
        this.dumbb1 = response;
        
        this.Solution = this.dumbb1.solutionData;
      
       console.log("Solution",this.Solution);
     
       for(let i=0; i<this.Solution.length; i++)
       {
       if(this.Solution[i].datasets.length!=0){
        this.linkedassets.push("Datasets")
       }
       if(this.Solution[i].pipelines.length!=0){
        this.linkedassets.push("Pipelines")
       }
       if(this.Solution[i].models.length!=0){
        this.linkedassets.push("Models")
       }
       if(this.Solution[i].frontends.length!=0){
        this.linkedassets.push("Frontends")
       }
       this.linkedassets1.push(this.linkedassets);
      
      this.Solution[i].linkedassets = this.linkedassets;
      this.linkedassets = [];
      }

        console.log(this.linkedassets1);
       
      }
      )
  }
 
  editData(data: any, jar: any) {
    this.SelectJar(jar);
    this.getDataPipeline(data)  
    // this.formdata.controls['name'].setValue(data.datasetName);
    // this.formdata.controls['version'].setValue(data.datasetVersion);
    // this.formdata.controls['id'].disable();
    // this.formdata4.controls['id'].disable();
    // this.formdata.controls['desc'].setValue(data.datasetDescription);
  }
  reload() {
    window.location.reload();
  }

  isReadMore = true;
  isReadMore1 = true;
  isReadMore2 = true;
  isReadMore3 = true;
  showText() {
     this.isReadMore = !this.isReadMore;
    
  }
  showText1(){
    this.isReadMore1 = !this.isReadMore1 
  }
  showText2(){
    this.isReadMore2 = !this.isReadMore2
  }
  showText3(){
    this.isReadMore3 = !this.isReadMore3
  }

  // Jars: any = [{ id: 1, name: 'Model' }, { id: 2, name: 'Dataset' }, { id: 3, name: 'Pipeline' }]
  // Model: any = [{ id: 1, name: 'Local Copy' }, { id: 2, name: 'Remote Copy' }, { id: 3, name: 'Using Id' }]
  data: any = [];
  store: any = [];
  
  
  
  // copytext() {
  //   navigator.clipboard.writeText(this.value1);
  // }
  // copytext1() {
  //   navigator.clipboard.writeText(this.value2);
  // }
  ds: boolean = false;
  mdl: boolean = false;
  sln: boolean = false;
  ppln:boolean=false;
  fend:boolean=false;
  jar: any;
  SelectJar(jar: any) {
  
    if (jar == 'Dataset') {
      this.ds = true;
      this.mdl = false;
      this.sln = false;
      this.ppln=false;
      this.fend=false;
    } else if (jar == 'Model') {
      this.ds = false;
      this.mdl = true;
      this.sln = false;
      this.ppln=false;
      this.fend=false;
    } else if (jar == 'Solution') {
      this.ds = false;
      this.mdl = false;
      this.sln = true;
      this.ppln=false;
      this.fend=false;
    } else if(jar == 'Pipeline'){
      this.ds = false;
      this.mdl = false;
      this.sln = false;
      this.ppln= true;
      this.fend=false;
      this.formdata8.reset();
    }else if(jar == 'Frontend'){
      this.ds = false;
      this.mdl = false;
      this.sln = false;
      this.ppln= false;
      this.fend= true;
      this.formdata9.reset();
    }
  }

  deleteId(data:any,jar:any){

    this.SelectJar(jar);

    if(jar == 'Dataset'){
      this.datasetId=data.datasetId;

    }else if(jar == 'Model'){
      this.modelId=data.modelId;

    } else if(jar == 'Solution'){
      this.solutionId=data.id;

    } else if(jar == 'Pipeline'){
      this.pipelineId=data.pipelineId;

    }else if(jar == 'Frontend'){
      this.frontendId=data.id;
    }
  }
  
  // value1: any = 'Enter all API_Data to generate the Script';
  // new_dataset_name: any = '';
  // dataset_id: any = '';
  // new_dataset_project_name: any = '';
//   DownloadData() {
//     if (this.selectedIndex != 3) {
//       this.selectedIndex = this.selectedIndex + 1;
//     }
//     console.log(this.selectedIndex);
//     this.new_dataset_name = this.formdata1.controls['dataset_name'].value;
//     this.dataset_id = this.formdata1.controls['dataset_id'].value;
//     this.new_dataset_project_name = this.formdata1.controls['dataset_project'].value;
//     this.value1 = `
// from clearml import Dataset
// #Get the dataset using Dataset Id
// dataset = Dataset.get("${this.dataset_id}")
// #Get the physical location of the dataset
// url = dataset._task.artifacts['data'].url
// # Create a dataset with ClearML\`s Dataset class
// new_dataset = Dataset.create(dataset_name="${this.new_dataset_name}",
//                   dataset_project="${this.new_dataset_project_name}") 
// #Add the example url                 
// new_dataset.add_external_files(source_url=url)
// # Upload dataset to ClearML server (customizable)
// new_dataset.upload() 
// # commit dataset changes
// new_dataset.finalize()
//   `
//   }
  // setDataValues(data: any) {
  //   this.formdata1.controls['dataset_name'].setValue(data.Name);
  //   this.formdata1.controls['dataset_id'].setValue(data.Id);
  // }
//   value2: any;
//   Model_Proj: any;
//   model_Id: any;
//   modelcode(data: any) {
//     this.Model_Proj = data.Name;
//     this.model_Id = data.Id;
//     this.value2 =
//       `from clearml import Model, Task, Logger
// import tensorflow as tf
// from tempfile import gettempdir
// import os
// import numpy as np
// import warnings
// warnings.filterwarnings('ignore')
// os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
// project_config = {
//     'PROJECT_NAME' : '${this.Model_Proj}'}
// task = Task.init(
//     project_name=project_config['PROJECT_NAME'],
//     task_name='Model Inference',
//     task_type='inference',
//     reuse_last_task_id=False
// )
// logger = task.get_logger()
// # print(f'Loading model: af7391e2c0784dbf9e83ba3969aee923')
// model = Model('${this.model_Id}')
// print(f'\nGetting a local copy of the model : {model.id}\n') 
// model_path  = model.get_local_copy()
// print(f'model_path= {model_path}')
// #Load the model into keras/tf
// model = tf.keras.models.load_model(model_path)
// print(model.summary())
// #Load data to run inference on mnnist test data
// (x_train,y_train),(x_test,y_test) = tf.keras.datasets.mnist.load_data()
// print(x_train.shape,y_train.shape,x_test.shape,y_test.shape)
// #run inference
// sample = x_test#[:5,:,:]
// for i,img in enumerate(sample):
//     pred = model.predict(np.expand_dims(img, axis=0))
//     pred = np.argmax(pred, axis=1)
//     logger.report_image("image", str(pred), iteration=i, image=img)`
//   }
  
  // @Output() CartEvent=new EventEmitter();
badgeCount:any;
cart:any=[];
dcart:any=[];
mcart:any=[];
pcart:any=[];
fcart:any=[];

  addtoCart(data:any){
    debugger
    this.cart.push(data);
  if(data.hasOwnProperty('modelId')){
    this.mcart.push(data);
  }else{
    this.dcart.push(data);
  }
    this.badgeCount=this.cart.length;
  }

  deleteSelected(data:any){
    if(data=='model'){
      this.mcart=[];
    }else if(data=='dataset'){
      this.dcart=[];
    }
    
    this.badgeCount=this.mcart.length+this.dcart.length;
  }


dropdowndata:any=[];
dropdownmodel:any=[];
dropdownpipeline:any=[];
dropdownfrontend:any=[];
editdropdowndata:any=[];
editdropdownmodel:any=[];
editdropdownpipeline:any=[];
editdropdownfrontend:any=[];

//On Type text change to Uppercase
onInputChange(key:string,value:string){
  if(key=='solution'){
    const inputControl = this.formdata3.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });
  }else if(key=='frontend'){
    const inputControl = this.formdata9.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });
  }else if(key=='pipeline'){
    const inputControl = this.formdata8.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });  
  }else if(key=='model'){
    const inputControl = this.formdata2.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });
  }else if(key=='dataset'){
    const inputControl = this.formdata.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });
  }else if(key=='edit-dataset'){
    const inputControl = this.formdata4.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });
  }else if(key=='edit-model'){
    const inputControl = this.formdata6.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });
  }else if(key=='edit-solution'){
    const inputControl = this.formdata7.get(value);
    inputControl.setValue(inputControl.value.toUpperCase(), { emitEvent: false });
  } 
}
 empty(){
    this.pipeline=[];
    this.Dataset=[];
    this.Solution=[];
    this.Modules=[];
    this.Frontend=[];
    this.groupedData=[];
    this.sections=[];
  }

  linkagedata:any=[];
  dummy6:any=[];
  dummy5:any;
  link:boolean=false;

  linkCheck(){
    this.link= !this.link;
  }

   linkage(data:any){
    let solutionId=data.id;
    this.http.post('http://3.111.229.37:3000/solution/linked', {solutionId})
    .subscribe(response => {    
      this.linkagedata=response;
      this.empty();  
      console.log(this.linkagedata);
      debugger
      this.linkCheck();
      this.selected=true;   
          this.Solution=this.linkagedata.solutions;
          this.isPanelOpen=true;
          this.Modules=this.linkagedata.models;
          this.pipeline=this.linkagedata.pipelines;
          this.Dataset=this.linkagedata.datasets;
          this.Frontend=this.linkagedata.frontends;

          this.sectionData();

        // if(this.Solution.length==1){
        //   this.updateArrows(data);
        // }
      })
  }

    fromCenterX:any;
    fromCenterY :any;
    toCenterX :any;
    toCenterY :any;
    fromCenterX1:any;
    fromCenterY1 :any;
    toCenterX1 :any;
    toCenterY1 :any;
    
  createArrow(from, to, yOffset,position) {
    debugger
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();
    
    if (navigator.platform.includes("Win")) {
      debugger

        this.fromCenterX = fromRect.width; //136
        this.fromCenterY =  fromRect.height/2;//104.75; 
        this.toCenterX = 1 ; //1
        this.toCenterY = toRect.height/2; //54/2=27

    } else if (navigator.platform.includes("Linux")) {
      // Running on Linux
      debugger
        this.fromCenterX = fromRect.width; //136
        this.fromCenterY =  fromRect.height/2;//104.75; 
        this.toCenterX = 1 ; //1
        this.toCenterY = toRect.height/2; //54/2=27
    }

    return new LeaderLine(
    LeaderLine.pointAnchor(from, { x: this.fromCenterX , y: this.fromCenterY  }),
    LeaderLine.pointAnchor(to, { x: this.toCenterX , y: this.toCenterY  }),
    {
      // LeaderLine.pointAnchor(from, { x: '100%', y: yOffset+'%' }),
      // LeaderLine.pointAnchor(to, { x: '1%', y: position+'%' }),
      // {
        color: 'black',
        size: 2,
        startSocket: 'right',
        endSocket: 'left',
        startPlug: 'disc',     
        endPlug: 'disc',
        endPlugSize: 1.5,
        path: 'fluid',
        gradient: true,
        lineOffset:100,
        dash: { animation: true }, 
      }
    );
  }
 
  // this.fromCenterX1 = position; //136
          // this.fromCenterY1 = position1 ;//104.75; //54/2=27
          // this.toCenterX1 = yOffset ; //136-136+1
          // this.toCenterY1 = position1; //54/2=27

  createArrow1(from, to, position,yOffset,position1) {
    debugger
        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();

        if (navigator.platform.includes("Win")) {
      
          this.fromCenterX1 = fromRect.width; //136
          this.fromCenterY1 =  fromRect.height/2;//54/2=27
          this.toCenterX1 = toRect.width-toRect.width+1 ; //1
          this.toCenterY1 = toRect.height/2;//54/2=27

        }else if (navigator.platform.includes("Linux")) {
          this.fromCenterX1 = fromRect.width; //136
          this.fromCenterY1 =  fromRect.height/2;//104.75; //54/2=27
          this.toCenterX1 = toRect.width-toRect.width+1 ; //136-136+1
          this.toCenterY1 = toRect.height/2;//54/2=27
        }

       
    
    return new LeaderLine(
      LeaderLine.pointAnchor(from, { x: this.fromCenterX1 , y: this.fromCenterY1  }),
      LeaderLine.pointAnchor(to, { x: this.toCenterX1 , y: this.toCenterY1  }),
      {
        color: 'black',
        size: 2,
        startSocket: 'right',
        endSocket: 'left',
        startPlug: 'disc',
        endPlug: 'disc',
        endPlugSize: 1.5,
        path: 'fluid',
        dash: { animation: true },
        end:137 
      }
    ); 
  }

  
  
  removearrow(){
    if(this.Frontend.length==1){
      this.arrowLink2.remove();
      this.arrowLink2 = null;
    }else if(this.Frontend.length==2){
      this.arrowLink2.remove();
      this.arrowLink2 = null;
      this.arrowLink3.remove();
      this.arrowLink3 = null;
    }else if(this.Frontend.length==3){
      this.arrowLink2.remove();
      this.arrowLink2 = null;
      this.arrowLink3.remove();
      this.arrowLink3 = null;
      this.arrowLink4.remove();
      this.arrowLink4 = null;
    }
  }


   updateArrows(data:any){
    debugger
    const table1 = document.getElementById("table1");
    const table2 = document.getElementById("table2");
    const table3 = document.getElementById("table3");
    const table4 = document.getElementById("table4");
    const table5 = document.getElementById("table5");
    const element2 = document.getElementById("element2") as HTMLInputElement;

      this.rows1 = table1.querySelectorAll("tr");
      this.rows2 = table2.querySelectorAll("tr");
      this.rows3 = table3.querySelectorAll("tr");
      this.rows4 = table4.querySelectorAll("tr");
      this.rows5 = table5.querySelectorAll("tr");

    
      // this.arrowLink2;
      // this.arrowLink3;
      // this.arrowLink4;
      // this.arrowLink5;
      // this.arrowLink6;

    //---------------solution to frontend---------------  
    if (this.Solution && this.arrowLink2 == undefined && data !='remove') { 
      for(let i=0;i<this.Frontend.length;i++){
        // ---check machine os--
        if(navigator.platform.includes("Linux")){
          //--- check number of cards---
          
          // else{
            if(this.Frontend.length<=2){
              if(i==0){
                this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),0,0); 
              } else{
                this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),0,0); 
              }
                  
            }else{
              if(i==0){
                this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),0,0); 
              } else if(i==1){
                this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),0,0); 
              }else{
                this.arrowLink4 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),0,0); 
              }
            }    
          // }
        
      }else{
        if(this.Frontend.length<=2){
          if(i==0){
            this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),78,178); 
          } else{
            this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),288,178); 
          }
              
        }else{
          if(i==0){
            this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),450,178); 
          } else if(i==1){
            this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),450,178); 
          }else{
            this.arrowLink4 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),450,178); 
          }
           
        }    
      }    
      }
    } 
    else if (this.arrowLink2 !=undefined && this.arrowLink3 && this.arrowLink4 && data=='remove') {
      
          this.arrowLink2.remove();
           this.arrowLink2 = null;
       
          this.arrowLink3.remove();
          this.arrowLink3 = null;
        
          this.arrowLink4.remove();
          this.arrowLink4 = null;
       
    }else if(this.arrowLink2 !=undefined && this.arrowLink3  && data=='remove'){
      this.arrowLink2.remove();
           this.arrowLink2 = null;
       
          this.arrowLink3.remove();
          this.arrowLink3 = null;
    }else if(this.arrowLink2 !=undefined  && data=='remove'){
      this.arrowLink2.remove();
           this.arrowLink2 = null;
   
    }
    
    // ---------------frontend to next---------------
    if (this.Frontend && this.pipeline.length!=0 && !this.arrowLink5) {
      debugger
      for(let i=0;i<this.pipeline.length;i++){
        if(navigator.platform.includes("Linux")){
        if(this.pipeline.length<=2){
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows3[i+2].querySelector("td"),212,116,0);
          }else{
            this.arrowLink6 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows3[i+2].querySelector("td"),212,116,0);
          } 
        }else{
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows3[i+2].querySelector("td"),250,320,0);
          }else if(i==1){
            this.arrowLink6 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows3[i+2].querySelector("td"),250,320,0);
          } else{
            this.arrowLink7 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows3[i+2].querySelector("td"),250,320,0);
          } 
        }  
      } else { 
        //---------windows-----applied only for 2 lines
        if(this.pipeline.length<=2){
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows3[i+2].querySelector("td"),435,240,103);
          }else{
            this.arrowLink6 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows3[i+2].querySelector("td"),435,240,103);
          } 
        }else{
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows3[i+2].querySelector("td"),250,320,50);
          }else if(i==1){
            this.arrowLink6 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows3[i+2].querySelector("td"),250,320,50);
          } else{
            this.arrowLink7 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows3[i+2].querySelector("td"),250,320,50);
          } 
        }  

      }   
      }   
    } else if(this.Frontend && this.Modules.length!=0 && !this.arrowLink5){
      for(let i=0;i<this.Modules.length;i++){
        if(navigator.platform.includes("Linux")){
        if(this.Modules.length<=2){
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows4[i+2].querySelector("td"),213,231,0);
          }else{
            this.arrowLink6 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows4[i+2].querySelector("td"),232,275,0);
          }  
        }else{
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows4[i+2].querySelector("td"),232,320,0);
          }else if(i==1){
            this.arrowLink6 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows4[i+2].querySelector("td"),232,320,0);
          } else{
            this.arrowLink7 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows4[i+2].querySelector("td"),232,320,0);
          }  
        }  
      }else{
        if(this.Modules.length<=2){
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows4[i+2].querySelector("td"),429,346,103);
          }else{
            this.arrowLink6 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows4[i+2].querySelector("td"),429,346,103);
          }  
        }else{
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows4[i+2].querySelector("td"),232,320,50);
          }else if(i==1){
            this.arrowLink6 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows4[i+2].querySelector("td"),232,320,50);
          } else{
            this.arrowLink7 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows4[i+2].querySelector("td"),232,320,50);
          }  
        }  
      }     
      }    

    }
    else if(this.Frontend.length!=0 && this.Dataset.length!=0 && !this.arrowLink5){
      for(let i=0;i<this.Dataset.length;i++){
        if(navigator.platform.includes("Linux")){
        if(this.Dataset.length<=2){
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows5[i+2].querySelector("td"),213,345,0);
          }else{
            this.arrowLink6 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows5[i+2].querySelector("td"),213,345,0);
          }  
        }else{
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows5[i+2].querySelector("td"),590,320,0);
          }else if(i==1){
            this.arrowLink6 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows5[i+2].querySelector("td"),590,320,0);
          } else{
            this.arrowLink7 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows5[i+2].querySelector("td"),590,320,0);
          }  
        } 
      }else{
        // ---------windows------------------
        if(this.Dataset.length<=2){
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows5[i+2].querySelector("td"),431,450,103);
          }else{
            this.arrowLink6 = this.createArrow1(this.rows2[2].querySelector("td"), this.rows5[i+2].querySelector("td"),431,450,103);
          }  
        }else{
          if(i==0){
            this.arrowLink5 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows5[i+2].querySelector("td"),590,320,50);
          }else if(i==1){
            this.arrowLink6 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows5[i+2].querySelector("td"),590,320,50);
          } else{
            this.arrowLink7 = this.createArrow1(this.rows2[3].querySelector("td"), this.rows5[i+2].querySelector("td"),590,320,50);
          }  
        } 
      }      
      }    
    }
    else if (this.arrowLink5 && this.arrowLink6 && this.arrowLink7 && data== 'remove') {
      this.arrowLink5.remove();
          this.arrowLink5 = null;
      this.arrowLink6.remove();
          this.arrowLink6 = null;
      this.arrowLink7.remove();
          this.arrowLink7 = null;
    }else if(this.arrowLink5 && this.arrowLink6 && data== 'remove'){
      this.arrowLink5.remove();
      this.arrowLink5 = null;
      this.arrowLink6.remove();
      this.arrowLink6 = null;
    }else if(this.arrowLink5 && data== 'remove'){
      this.arrowLink5.remove();
      this.arrowLink5 = null;
    }

// ---------------pipeline to next---------------
    if (this.pipeline.length!=0 && this.Modules!=0 && !this.arrowLink8) {
      for(let i=0;i<this.Modules.length;i++){
        if(navigator.platform.includes("Linux")){
        if(this.Modules.length<=3){
          if(i==0){
            this.arrowLink8 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows4[i+2].querySelector("td"),328,230,0);
          }else if(i==1){
            this.arrowLink9 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows4[i+2].querySelector("td"),328,230,0);
          }else{
            this.arrowLink10 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows4[i+2].querySelector("td"),328,230,0);
          }  
        }else{
          if(i==0){
            this.arrowLink8 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows4[i+2].querySelector("td"),200,330,0);
          }else if(i==1){
            this.arrowLink9 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows4[i+2].querySelector("td"),200,330,0);
          } else{
            this.arrowLink10 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows4[i+2].querySelector("td"),200,330,0);
          } 
          
        }  
      }else{
        // -----------windows----------
        if(this.Modules.length<=3){
          if(i==0){
            this.arrowLink8 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows4[i+2].querySelector("td"),255,165,273);
          }else if(i==1){
            this.arrowLink9 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows4[i+2].querySelector("td"),255,165,273);
          }else{
            this.arrowLink10 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows4[i+2].querySelector("td"),485,388,103);
          }  
        }else{
          if(i==0){
            this.arrowLink8 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows4[i+2].querySelector("td"),200,415,100);
          }else if(i==1){
            this.arrowLink9 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows4[i+2].querySelector("td"),200,411,100);
          } else{
            this.arrowLink10 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows4[i+2].querySelector("td"),200,411,100);
          }   
        }  
      }     
      }  
    } else if(this.pipeline.length!=0 && this.Dataset!=0 && !this.arrowLink8){
      for(let i=0;i<this.Dataset.length;i++){
        if(this.Dataset.length<=2){
          if(i==0){
            this.arrowLink8 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows5[i+2].querySelector("td"),200,606,50);
          }else{
            this.arrowLink9 = this.createArrow1(this.rows3[2].querySelector("td"), this.rows5[i+2].querySelector("td"),200,606,50);
          }    
        }else{
          if(i==0){
            this.arrowLink8 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows5[i+2].querySelector("td"),200,606,50);
          }else if(i==1){
            this.arrowLink9 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows5[i+2].querySelector("td"),200,606,50);
          } else{
            this.arrowLink10 = this.createArrow1(this.rows3[3].querySelector("td"), this.rows5[i+2].querySelector("td"),200,606,50);
          }   
        }       
      }  
    }
    else if ( this.arrowLink8 && this.arrowLink9 && this.arrowLink10 && data== 'remove') {
      
          this.arrowLink8.remove();
      this.arrowLink8 = null;
        
          this.arrowLink9.remove();
      this.arrowLink9 = null;
        
          this.arrowLink10.remove();
      this.arrowLink10 = null;
        
     
    }else if(this.arrowLink8 && this.arrowLink9 &&  data== 'remove'){
      this.arrowLink8.remove();
      this.arrowLink8 = null;
        
          this.arrowLink9.remove();
      this.arrowLink9 = null;
    }else if(this.arrowLink8 &&  data== 'remove'){
      this.arrowLink8.remove();
      this.arrowLink8 = null;
    }

    // ---------------Modules to Dataset---------------
    debugger
    if (this.Modules.length!=0 && this.Dataset.length!=0 && !this.arrowLink11) {
      for(let i=0;i<this.Dataset.length;i++){
        if(navigator.platform.includes("Linux")){
        if(this.Dataset.length<=2){
          if(i==0){
            this.arrowLink11 = this.createArrow1(this.rows4[2].querySelector("td"), this.rows5[i+2].querySelector("td"),442,345,0);
          }else{
            this.arrowLink12 = this.createArrow1(this.rows4[2].querySelector("td"), this.rows5[i+2].querySelector("td"),442,345,0);
          }  
        }else{  
          if(i==0){
            this.arrowLink11 = this.createArrow1(this.rows4[3].querySelector("td"), this.rows5[i+2].querySelector("td"),280,250,0);
          }else if(i==1){
            this.arrowLink12 = this.createArrow1(this.rows4[3].querySelector("td"), this.rows5[i+2].querySelector("td"),280,250,0);
          }else{
            this.arrowLink13 = this.createArrow1(this.rows4[3].querySelector("td"), this.rows5[i+2].querySelector("td"),280,250,0);
          }
        } 
      }else{
          // ---------windows----------------
        if(this.Dataset.length<=2){
          if(i==0){
            this.arrowLink11 = this.createArrow1(this.rows4[2].querySelector("td"), this.rows5[i+2].querySelector("td"),305,214,280);
          }else{
            this.arrowLink12 = this.createArrow1(this.rows4[2].querySelector("td"), this.rows5[i+2].querySelector("td"),305,214,280);
          }  
        }else{
          if(i==0){
            this.arrowLink11 = this.createArrow1(this.rows4[3].querySelector("td"), this.rows5[i+2].querySelector("td"),0,345,0);
          }else if(i==1){
            this.arrowLink12 = this.createArrow1(this.rows4[3].querySelector("td"), this.rows5[i+2].querySelector("td"),0,345,0);
          }else{
            this.arrowLink13 = this.createArrow1(this.rows4[3].querySelector("td"), this.rows5[i+2].querySelector("td"),0,345,0);
          }
        } 
      }      
      }  
    } 
    else if (this.arrowLink11 && this.arrowLink12 && this.arrowLink13 && data=='remove') {
     
          this.arrowLink11.remove();
      this.arrowLink11 = null;
       
          this.arrowLink12.remove();
          this.arrowLink12 = null;
       
          this.arrowLink13.remove();
      this.arrowLink13 = null;
       
      
    }else if(this.arrowLink11 && this.arrowLink12  && data=='remove'){
      this.arrowLink11.remove();
      this.arrowLink11 = null;
       
          this.arrowLink12.remove();
          this.arrowLink12 = null;
    }else if(this.arrowLink11  && data=='remove'){
      this.arrowLink11.remove();
      this.arrowLink11 = null;
    }
  }



//   createArrow(from, to, yOffset,position) {
//     debugger
//     return new LeaderLine(
//       LeaderLine.pointAnchor(from, { x: '159%', y: '420%' }),
//       LeaderLine.pointAnchor(to, { x: '69%', y: position+'%' }),
//       {
//         color: 'black',
//         size: 2,
//         startSocket: 'right',
//         endSocket: 'left',
//         startPlug: 'disc',     
//         endPlug: 'disc',
//         endPlugSize: 1.5,
//         path: 'fluid',
//         gradient: true,
//         lineOffset:100,
//         dash: { animation: true }, 
//       }
//     );
//   }
 
//   createArrow1(from, to, yOffset,position) {
//     debugger
   
//     return new LeaderLine(
//       LeaderLine.pointAnchor(from, { x: '333%', y: position+'%' }),
//       LeaderLine.pointAnchor(to, { x: yOffset+'%', y: position+'%' }),  
//       {
//         color: 'black',
//         size: 2,
//         startSocket: 'right',
//         endSocket: 'left',
//         startPlug: 'disc',
//         endPlug: 'disc',
//         endPlugSize: 1.5,
//         path: 'grid',
//         dash: { animation: true },
//         end:137
        
//       }
//     );
    
//   }
//   createArrow2(from, to, yOffset,position) {
//     debugger
//     return new LeaderLine(
//       LeaderLine.pointAnchor(from, { x: '507%', y: '275%' }),
//       LeaderLine.pointAnchor(to, { x: position+'%', y: '275%' }),  //427 //606
//       {
//         color: 'black',
//         size: 2,
//         startSocket: this.createArrow1,
//         endSocket: 'left',
//         startPlug: 'disc',
//         endPlug: 'disc',
//         endPlugSize: 1.5,
//         path: 'fluid',
//         dash: { animation: true },
       
//       }
//     );
//   }

//   createArrow3(from, to, yOffset) {
//     debugger
//     return new LeaderLine(
//       LeaderLine.pointAnchor(from, { x: '680%', y: '275%' }),
//       LeaderLine.pointAnchor(to, { x: '590%', y: '275%' }),
//       {
//         color: 'black',
//         size: 2,
//         startSocket: 'right',
//         endSocket: 'left',
//         startPlug: 'disc',
//         endPlug: 'disc',
//         endPlugSize: 1.5,
//         path: 'grid',
//         dash: { animation: true },
//       }
//     );
//   }
  
//    updateArrows(data:any){
   
//     const table1 = document.getElementById("table1");
//     const table2 = document.getElementById("table2");
//     const table3 = document.getElementById("table3");
//     const table4 = document.getElementById("table4");
//     const table5 = document.getElementById("table5");
//     const element2 = document.getElementById("element2") as HTMLInputElement;

//       this.rows1 = table1.querySelectorAll("tr");
//       this.rows2 = table2.querySelectorAll("tr");
//       this.rows3 = table3.querySelectorAll("tr");
//       this.rows4 = table4.querySelectorAll("tr");
//       this.rows5 = table5.querySelectorAll("tr");

    
//       // this.arrowLink2;
//       // this.arrowLink3;
//       // this.arrowLink4;
//       // this.arrowLink5;
//       // this.arrowLink6;
    
//     //---------------solution to frontend---------------  
//     if (this.Solution && this.arrowLink2 == undefined && data !='remove') { 
//       for(let i=0;i<this.Frontend.length;i++){
//         if(this.Frontend.length<=2){
//           if(i==0){
//             this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,275); 
//           } else{
//             this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,275); 
//           }
              
//         }else{
//           if(i==0){
//             this.arrowLink2 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,320); 
//           } else if(i==1){
//             this.arrowLink3 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,320); 
//           }else{
//             this.arrowLink4 = this.createArrow(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250,320); 
//           }
           
//         }        
//       }
//     } 
//     else if (this.arrowLink2 !=undefined && this.arrowLink3 && this.arrowLink4 && data=='remove') {
      
//           this.arrowLink2.remove();
//            this.arrowLink2 = null;
       
//           this.arrowLink3.remove();
//           this.arrowLink3 = null;
        
//           this.arrowLink4.remove();
//           this.arrowLink4 = null;
       
//     }else if(this.arrowLink2 !=undefined && this.arrowLink3  && data=='remove'){
//       this.arrowLink2.remove();
//            this.arrowLink2 = null;
       
//           this.arrowLink3.remove();
//           this.arrowLink3 = null;
//     }else if(this.arrowLink2 !=undefined  && data=='remove'){
//       this.arrowLink2.remove();
//            this.arrowLink2 = null;
   
//     }
    
//     // ---------------frontend to next---------------
//     if (this.Frontend && this.pipeline.length!=0 && !this.arrowLink5) {
//       for(let i=0;i<this.pipeline.length;i++){
//         if(this.pipeline.length<=2){
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),242,275);
//           }else{
//             this.arrowLink6 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),242,275);
//           } 
//         }else{
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),249,320);
//           }else if(i==1){
//             this.arrowLink6 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),249,320);
//           } else{
//             this.arrowLink7 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),249,320);
//           } 
//         }       
//       }   
//     } else if(this.Frontend && this.Modules.length!=0 && !this.arrowLink5){

//     }
//     else if(this.Frontend.length!=0 && this.Dataset.length!=0 && !this.arrowLink5){
//       for(let i=0;i<this.Dataset.length;i++){
//         if(this.Dataset.length<=2){
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),590,275);
//           }else{
//             this.arrowLink6 = this.createArrow1(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),590,275);
//           }  
//         }else{
//           if(i==0){
//             this.arrowLink5 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),590,320);
//           }else if(i==1){
//             this.arrowLink6 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),590,320);
//           } else{
//             this.arrowLink7 = this.createArrow1(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),590,320);
//           }  
//         }       
//       }    
//     }
//     else if (this.arrowLink5 && this.arrowLink6 && this.arrowLink7 && data== 'remove') {
//       this.arrowLink5.remove();
//           this.arrowLink5 = null;
//       this.arrowLink6.remove();
//           this.arrowLink6 = null;
//       this.arrowLink7.remove();
//           this.arrowLink7 = null;
//     }else if(this.arrowLink5 && this.arrowLink6 && data== 'remove'){
//       this.arrowLink5.remove();
//       this.arrowLink5 = null;
//       this.arrowLink6.remove();
//       this.arrowLink6 = null;
//     }else if(this.arrowLink5 && data== 'remove'){
//       this.arrowLink5.remove();
//       this.arrowLink5 = null;
//     }

// // ---------------pipeline to next---------------
//     if (this.pipeline.length!=0 && this.Modules!=0 && !this.arrowLink8) {
//       for(let i=0;i<this.Modules.length;i++){
//         if(this.Modules.length<=2){
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,415);
//           }else{
//             this.arrowLink9 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,415);
//           }  
//         }else{
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,415);
//           }else if(i==1){
//             this.arrowLink9 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,411);
//           } else{
//             this.arrowLink10 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,411);
//           } 
          
//         }       
//       }  
//     } else if(this.pipeline.length!=0 && this.Dataset!=0 && !this.arrowLink8){
//       for(let i=0;i<this.Dataset.length;i++){
//         if(this.Dataset.length<=2){
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }else{
//             this.arrowLink9 = this.createArrow2(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }    
//         }else{
//           if(i==0){
//             this.arrowLink8 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }else if(i==1){
//             this.arrowLink9 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           } else{
//             this.arrowLink10 = this.createArrow2(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),200,606);
//           }   
//         }       
//       }  
//     }
//     else if ( this.arrowLink8 && this.arrowLink9 && this.arrowLink10 && data== 'remove') {
      
//           this.arrowLink8.remove();
//       this.arrowLink8 = null;
        
//           this.arrowLink9.remove();
//       this.arrowLink9 = null;
        
//           this.arrowLink10.remove();
//       this.arrowLink10 = null;
        
     
//     }else if(this.arrowLink8 && this.arrowLink9 &&  data== 'remove'){
//       this.arrowLink8.remove();
//       this.arrowLink8 = null;
        
//           this.arrowLink9.remove();
//       this.arrowLink9 = null;
//     }else if(this.arrowLink8 &&  data== 'remove'){
//       this.arrowLink8.remove();
//       this.arrowLink8 = null;
//     }

//     // ---------------Modules to Dataset---------------
//     debugger
//     if (this.Modules.length!=0 && this.Dataset.length!=0 && !this.arrowLink11) {
//       for(let i=0;i<this.Dataset.length;i++){
//         if(this.Dataset.length<=2){
//           if(i==0){
//             this.arrowLink11 = this.createArrow3(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }else{
//             this.arrowLink12 = this.createArrow3(this.rows1[2].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }  
//         }else{
//           if(i==0){
//             this.arrowLink11 = this.createArrow3(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }else if(i==1){
//             this.arrowLink12 = this.createArrow3(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }else{
//             this.arrowLink13 = this.createArrow3(this.rows1[3].querySelector("td"), this.rows2[i+2].querySelector("td"),250);
//           }
          
//         }       
//       }  
//     } 
//     else if (this.arrowLink11 && this.arrowLink12 && this.arrowLink13 && data=='remove') {
     
//           this.arrowLink11.remove();
//       this.arrowLink11 = null;
       
//           this.arrowLink12.remove();
//           this.arrowLink12 = null;
       
//           this.arrowLink13.remove();
//       this.arrowLink13 = null;
       
      
//     }else if(this.arrowLink11 && this.arrowLink12  && data=='remove'){
//       this.arrowLink11.remove();
//       this.arrowLink11 = null;
       
//           this.arrowLink12.remove();
//           this.arrowLink12 = null;
//     }else if(this.arrowLink11  && data=='remove'){
//       this.arrowLink11.remove();
//       this.arrowLink11 = null;
//     }
//   }

}