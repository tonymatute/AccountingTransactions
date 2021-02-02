using System;
using System.Net.Http;
using System.Net.Http.Headers;

public class TroopTrackAPI : IDisposable
{
    public TroopTrackAPI()
    {
        ApiClient = new HttpClient();
        ApiClient.BaseAddress = new Uri("https://troop425.trooptrack.com/");
        ApiClient.DefaultRequestHeaders.Accept.Clear();
        ApiClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        ApiClient.DefaultRequestHeaders.Add("X-Partner-Token", "FhNmx0V3K0bOQXGeZ7-W4Q");
        ApiClient.DefaultRequestHeaders.Add("X-User-Token", "GcWWOz_Dd3TDYS9qmJs39w");

    }

    public HttpClient ApiClient { get; set; }

    public void Dispose()
    {
        ApiClient.Dispose();
    }
}