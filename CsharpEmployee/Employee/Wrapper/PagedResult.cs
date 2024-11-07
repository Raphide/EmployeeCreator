// public class PagedResult<T>
// {
//     public IList<T> Content { get; set; }
//     public int PageNumber { get; set; }
//     public int PageSize { get; set; }
//     public int TotalPages { get; set; }
//     public int TotalCount { get; set; }

//     public PagedResult(IList<T> items, int count, int pageNumber, int pageSize)
//     {
//         PageNumber = pageNumber;
//         PageSize = pageSize;
//         TotalCount = count;
//         TotalPages = (int)Math.Ceiling(count / (double)pageSize);
//         Content = items;
//     }
// }

public class PagedResult<T>
{
    public IList<T> Content { get; set; }
    public PageableInfo Pageable { get; set; }
    public bool Last { get; set; }
    public int TotalPages { get; set; }
    public int TotalElements { get; set; }
    public int Size { get; set; }
    public int Number { get; set; }
    public SortInfo Sort { get; set; }
    public bool First { get; set; }
    public int NumberOfElements { get; set; }
    public bool Empty { get; set; }

    public PagedResult(IList<T> items, int count, int pageNumber, int pageSize)
    {
        Content = items;
        TotalElements = count;
        Size = pageSize;
        Number = pageNumber - 1;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        NumberOfElements = items.Count;
        First = pageNumber == 0;
        Last = pageNumber == TotalPages;
        Empty = !items.Any();

        Pageable = new PageableInfo
        {
            PageNumber = Number,
            PageSize = pageSize,
            Sort = new SortInfo(),
            Offset = (pageNumber - 1) * pageSize,
            Paged = true,
            Unpaged = false
        };

        Sort = new SortInfo();
    }
}

public class PageableInfo
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public required SortInfo Sort { get; set; }
    public int Offset { get; set; }
    public bool Paged { get; set; }
    public bool Unpaged { get; set; }
}

public class SortInfo
{
    public bool Empty { get; set; } = true;
    public bool Sorted { get; set; } = false;
    public bool Unsorted { get; set; } = true;
}