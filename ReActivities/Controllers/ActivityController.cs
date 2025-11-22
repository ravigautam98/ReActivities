using Applications.Activities.Queries;
using Domains.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistances.Entities;

namespace ReActivities.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        private readonly IMediator mediator;

        public ActivityController(AppDbContext appDbContext, IMediator mediator)
        {
            this.appDbContext = appDbContext;
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> getAllActivity()
        {
            //var activities = appDbContext.Activities.ToList();
            //return Ok(activities);
            
            return await mediator.Send(new GetActivitiesList.Query());
        }

        [HttpPost]
        public IActionResult addActivity([FromBody]Activity activity)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
        .SelectMany(v => v.Errors)
        .Select(e => e.ErrorMessage)
        .ToList();

                return BadRequest(new
                {
                    success = false,
                    message = "Validation failed",
                    errors
                });
            }
            try
            {
                appDbContext.Activities.Add(activity);
                appDbContext.SaveChanges();
                return Ok(activity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while saving activity", error = ex.Message });
            }
        }

        [HttpPut]
        public async Task<IActionResult> updateActivity( Activity updateActivity)
        {
            var activity  =  await appDbContext.Activities.FindAsync(updateActivity.Id);

            if(activity is null) { return NotFound(); }

            activity.Id = updateActivity.Id;
            activity.Title = updateActivity.Title;  
            activity.IsCompleted = updateActivity.IsCompleted;  

            
            appDbContext.SaveChanges();
            return Ok(activity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(string id)
        {
            var activity = await appDbContext.Activities.FindAsync(id);

            if (activity == null)
                return NotFound(new { message = "Activity not found" });

            appDbContext.Activities.Remove(activity);
            await appDbContext.SaveChangesAsync();

            return Ok(new { message = "Activity deleted", data = activity });
        }
    }
}
