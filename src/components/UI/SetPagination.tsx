import Button from "./Button"



interface IProps {
    page:number, 
    pagecount:number,
    total : number
    prevButtonHandler:()=>void,
    nextButtonHandler:()=>void,
    isLoading:boolean

}

const Pagination = ({page , pagecount  , total, prevButtonHandler , nextButtonHandler,isLoading} : IProps) =>{


    return(

        <div className="flex justify-center align-center ">
    
            <div className="my-10 ">
                <h2 className="text-md text-balance" >Page:{page} , Total :{total} , Number Count:{pagecount}  </h2>
            </div>
          <div className="flex my-3">
              <Button  isLoading ={isLoading} disabled={page === 1} onClick={prevButtonHandler} type="button" className="m-5 bg-gray-500 text-white py-2 px-2 hover:bg-gray-600 cursor-pointer " >Previous</Button>
            <Button  isLoading ={isLoading}  disabled={page === pagecount} onClick={nextButtonHandler} type="button" className="m-5 bg-gray-500 text-white py-2 px-2 hover:bg-gray-600  cursor-pointer" >Next</Button>
        
          </div>
        </div>
    )
}
export default Pagination;