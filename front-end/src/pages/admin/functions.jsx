import axios from "axios";
import { Alert } from "bootstrap";
import { AlertBox } from "../../components/AlertBox";

export function printBill(products, total) {
  const printWindow = window.open('', '', 'width=800,height=600');

  const printContent = `
    <html>
      <head>
        <title>Bill</title>
        <style>
          /* Add your print styles here */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            width: 80mm; /* Adjust according to your thermal printer paper width */
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          h1, h2 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Bill</h1>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(product => `
              <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h2>Total: ${total}</h2>
        <script>
          // Close the print window after printing
          window.onafterprint = function() {
            window.close();
          };
          // Print the document
          window.print();
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();
}


export async function PendingBill(mobile, myProducts, totalAmt) {
   const res = await axios.post("http://localhost:3000/api/v1/admin/payLater",{
      pending : {
          mobile : mobile,
          items : myProducts
      },
    },{
      withCredentials: true,
    }); 
  AlertBox(1, res.data.message);
}