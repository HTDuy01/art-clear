import React, { useEffect, useState } from 'react';

import axios from "axios";
import { PDFViewer,Document,Page,View,Text } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import styles1 from './IssueInvoice.module.scss';

function IssueInvoice(props){
    const [isOpen, setIsOpen] = useState(false);
        const [IssueInvoice, seteditIssueInvoice] = useState([])
        const [showProduct, seteditshowProduct] = useState([])

    useEffect(()=>{
        axios.get(" https://art-clear-backend.onrender.com/api/auth/invoices/"+props.id)
            .then(res => {
                const data = res.data.items
                seteditIssueInvoice(res.data);
                axios.post(" https://art-clear-backend.onrender.com/api/auth/productCart",data)
                .then(res => {
                    seteditshowProduct(res.data.data);
                })
            })
    },[props.id])
    const openForm = () => {
        setIsOpen(true);
      };
    
      const closeForm = () => {
        setIsOpen(false);
      };

      const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#fff',
          padding: 20,
        },
        section: {
          marginBottom: 10,
        },
        header: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        table: {
          display: 'table',
          width: '100%',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#ddd',
          marginBottom: 10,
        },
        tableRow: {
          flexDirection: 'row',
        },
        tableCellHeader: {
          backgroundColor: '#f0f0f0',
          color: '#333',
          width: '100%',
          padding: 8,
          fontWeight: 'bold',
          borderWidth: 1,
          borderColor: '#ddd',
        },
        tableCell: {
          width: '100%',
          padding: 8,
          borderWidth: 1,
          borderColor: '#ddd',
        },
        totalAmount: {
          
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 10,
        },
      });

      const addOrderToItems = () => {
        return showProduct.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      };
      const itemsWithOrder = addOrderToItems()
    return(
        <div className={styles1.popup_form}>
        <button className={styles1.button_add} onClick={openForm}>Issue Invoice</button>
        {isOpen && (
        
            <div className={styles1.popup}>
              <button type="button" className={styles.btn || styles.cancel} onClick={closeForm}>Đóng</button>
                <PDFViewer width="100%" height="600px">
                        <Document>
                            <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <Text style={styles.header}>Invoice Details</Text>
                                <Text>Buyer: {IssueInvoice.buyerName}</Text>

                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCellHeader}>STT</Text>
                                        <Text style={styles.tableCellHeader}>Product</Text>
                                        <Text style={styles.tableCellHeader}>Quantity</Text>
                                        <Text style={styles.tableCellHeader}>Price</Text>
                                    </View>
                                        {itemsWithOrder.map((item) => (
                                            <View style={styles.tableRow} key={item.id}>
                                            <Text style={styles.tableCell}>{item.order}</Text>
                                            <Text style={styles.tableCell} >{item.picture_name}</Text>
                                            <Text style={styles.tableCell}>{item.quantity}</Text>
                                            <Text style={styles.tableCell}>{item.price}</Text>
                                            </View>
                                        ))}
                                    <View style={styles.tableRow} >
                                        <Text style={styles.tableCell}></Text>
                                        <Text style={styles.tableCell}><Text style={styles.totalAmount}>Total Amount: </Text></Text>
                                        <Text style={styles.tableCell}><Text style={styles.totalAmount}>{IssueInvoice.totalAmount}</Text></Text>
                                    </View>
                                </View>
                                
                                
                            </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                
            </div>

        
        )}
      </div>
    )
}
export default IssueInvoice;