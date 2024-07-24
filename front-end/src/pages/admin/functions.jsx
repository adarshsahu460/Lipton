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
              <th>SI No.</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Net Amount</th>
              <th>Tax Type</th>
              <th>Tax Rate</th>
              <th>Tax Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${products.map((product,index) => `
              <tr>
                <td>${index+1}</td>
                <td>${product.name}</td>
                <td>${(product.price / 1.18).toFixed(2)}</td>
                <td>${product.qty}</td>
                <td>${(Number(product.price) * Number(product.qty) / 1.18).toFixed(2)}</td>
                <td>CGST</td>
                <td>9%</td>
                <td>${(Number(product.price) * Number(product.qty) * 0.09).toFixed(2)}</td>
                <td>${Number(product.price) * Number(product.qty)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>SGST</td>
                <td>9%</td>
                <td>${(Number(product.price) * Number(product.qty) * 0.09).toFixed(2)}</td>
                <td></td>
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
  if(res.status == 200){
    AlertBox(1, res.data.message);
  }else{
    AlertBox(2, res.data.message);
  }
}