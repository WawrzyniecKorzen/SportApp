namespace SportApp.Api.Validation
{
    public class ValidationConstants
    {
        //training data constants
        public const int MaxDurationMinutes = 1440;
        public const int MinDurationMinutes = 1;
        public const double MaxDistanceKm = 1000;
        public const int MaxCalories = 100000;
        public const int MaxDescriptionLength = 1000;

        //training query constants
        public const int MaxTrainingsPerPage = 100;
        public const int MaxPages = int.MaxValue;

        //user data constants
        public const int MinPasswordLength = 8;
        public const int MaxPasswordLength = 128;
        public const int MaxEmailLength = 254;
        public const int MaxNameLength = 100;
    }
}
