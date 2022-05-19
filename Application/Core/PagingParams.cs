namespace Application.Core
{
    public class PagingParams
    {
        private const int MaxpageSize = 50 ;
        public int  pageNumber {get;set;} = 1;
        private int _pageSize = 2;
        public int PageSize 
        {
            get => _pageSize;
            set => _pageSize =(value > MaxpageSize) ? MaxpageSize:value;
        }

    }
}