using System;
using Domains.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistances.Entities;

namespace Applications.Activities.Queries
{
    public class GetActivitiesList
    {
        public class Query : IRequest<List<Activity>>
        {

        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
        {
            public Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return context.Activities.ToListAsync();    
            }
        }
    }
}
