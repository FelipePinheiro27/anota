using System.Security.Cryptography;
using System.Text;

namespace anota_backend.Helper;

public static class Encryption
{
    public static string generateHash(this string value)
    {
        var hash = SHA1.Create();
        var encoding = new ASCIIEncoding();
        var bytes = encoding.GetBytes(value);

        bytes = hash.ComputeHash(bytes);

        var strHexa = new StringBuilder();

        foreach (var item in bytes)
        {
            strHexa.Append(item.ToString("x2"));
        }

        return strHexa.ToString();
    }
}