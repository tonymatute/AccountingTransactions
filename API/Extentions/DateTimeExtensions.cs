using System;

namespace API.Extentions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age)) age--;
            return age;
        }

        public static int CalculateAge(this DateTime? dob)
        {
            var age = 0;
            DateTime updateddob;
            if (dob.HasValue) { updateddob = dob.Value; }
            else { return age; }

            var today = DateTime.Today;
            age = today.Year - updateddob.Year;
            if (updateddob.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}
