using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Errors;
using API.Model;
using AutoMapper;
using MediatR;

namespace API.Features.##Class#
{
    public class Details
    { 
        public class Query : IRequest<##Class#Dto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ##Class#Dto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<##Class#Dto> Handle(Query request, CancellationToken cancellationToken)
            {
                var testApp = await _context.Catalogs
                    .FindAsync(request.Id);

                if (testApp == null)
                    throw new RestException(HttpStatusCode.NotFound, new { TestApp = "Not found" });

                var toReturn = _mapper.Map<TestApp, TestAppDto>(testApp); 

                return toReturn;
            }
        }
    }
}
