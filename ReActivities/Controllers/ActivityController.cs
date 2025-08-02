using Domains.Models;
using Microsoft.AspNetCore.Mvc;
using Persistances.Entities;

namespace ReActivities.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        public readonly AppDbContext appDbContext;

        public ActivityController(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        [HttpGet]
        public IActionResult getAllActivity()
        {
            var activities = appDbContext.Activities.ToList();
            return Ok(activities);  
        }

        [HttpPost]
        public IActionResult addActivity(Activity activity)
        {
            appDbContext.Activities.Add(activity);
            appDbContext.SaveChanges();
            return Ok();
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

        [HttpDelete]
        public async Task< IActionResult> deleteActivity(Activity deleteActivity)
        {
            var activity = await appDbContext.Activities.FindAsync(deleteActivity.Id);

            if (activity is null) { return NotFound(); }

            appDbContext.Activities.Remove(activity);

            appDbContext.SaveChanges();
            return Ok(activity);
        }
    }
}
