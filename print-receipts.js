// Print Kitchen Receipt
function printKitchenReceipt(orderId) {
    // Try to get order from localStorage
    const orders = JSON.parse(localStorage.getItem('erfurtPizzaOrders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const printWindow = window.open('', '_blank');
    const date = new Date(order.timestamp);
    const formattedDate = date.toLocaleString('de-DE');

    const items = order.cart.map(item => {
        const sizeText = item.size ? ` (${item.size})` : '';

        // Build extras display
        let extrasHTML = '';
        if(item.extras && item.extras.length > 0) {
            extrasHTML = '<tr><td colspan="2" style="padding: 4px 0 4px 40px; font-size: 14px; color: #666;">';
            item.extras.forEach(extra => {
                const extraPriceText = extra.price === 0 ? '' : ` (+${extra.price.toFixed(2)}€)`;
                extrasHTML += `+ ${extra.name}${extraPriceText}<br>`;
            });
            extrasHTML += '</td></tr>';
        }

        return `
            <tr>
                <td style="padding: 8px 0; font-size: 18px; font-weight: bold;">${item.quantity}x</td>
                <td style="padding: 8px 0; font-size: 18px;">${item.name}${sizeText}</td>
            </tr>
            ${extrasHTML}
        `;
    }).join('');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Küchenbonbon #${order.id}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Courier New', monospace;
                    padding: 20px;
                    max-width: 400px;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #000;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                }
                .header h1 {
                    font-size: 32px;
                    margin-bottom: 5px;
                }
                .header h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .section {
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px dashed #666;
                }
                .section:last-child {
                    border-bottom: none;
                }
                .label {
                    font-weight: bold;
                    font-size: 14px;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }
                .value {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .notes {
                    background: #f0f0f0;
                    padding: 10px;
                    margin-top: 10px;
                    border: 2px solid #000;
                }
                .delivery-badge {
                    background: #000;
                    color: #fff;
                    padding: 8px 15px;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: bold;
                    margin-top: 10px;
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🍕 ERFURT PIZZA</h1>
                <h2>KÜCHE</h2>
                <div style="font-size: 20px; font-weight: bold; margin-top: 10px;">
                    Bestellung #${order.id}
                </div>
                <div style="font-size: 14px; margin-top: 5px;">
                    ${formattedDate}
                </div>
            </div>

            <div class="section">
                <div class="label">Lieferart:</div>
                <div class="delivery-badge">
                    ${order.deliveryMethod === 'delivery' ? '🚚 LIEFERUNG' : '📦 ABHOLUNG'}
                </div>
            </div>

            ${order.deliveryMethod === 'delivery' ? `
            <div class="section">
                <div class="label">Lieferadresse:</div>
                <div class="value">
                    ${order.name}<br>
                    ${order.street}<br>
                    ${order.zip} ${order.city}<br>
                    Tel: ${order.phone}
                </div>
            </div>
            ` : `
            <div class="section">
                <div class="label">Kunde:</div>
                <div class="value">
                    ${order.name}<br>
                    Tel: ${order.phone}
                </div>
            </div>
            `}

            <div class="section">
                <div class="label">Bestellung:</div>
                <table>
                    ${items}
                </table>
            </div>

            ${order.notes ? `
            <div class="section">
                <div class="label">⚠️ Wichtige Hinweise:</div>
                <div class="notes">
                    ${order.notes}
                </div>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 30px; font-size: 16px; font-weight: bold;">
                Gesamtbetrag: ${order.total}
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 12px; border-top: 2px solid #000; padding-top: 10px;">
                ${order.paymentMethod === 'cash' ? '💰 BARZAHLUNG' :
                  order.paymentMethod === 'paypal' ? '💳 PAYPAL' :
                  '💳 KREDITKARTE'}
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// Print Invoice (Customer Receipt)
function printInvoice(orderId) {
    // Try to get order from localStorage
    const orders = JSON.parse(localStorage.getItem('erfurtPizzaOrders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const printWindow = window.open('', '_blank');
    const date = new Date(order.timestamp);
    const formattedDate = date.toLocaleString('de-DE');

    const items = order.cart.map(item => {
        const sizeText = item.size ? ` (${item.size})` : '';

        // Calculate total including extras
        const basePrice = item.price;
        const extrasPrice = (item.extras || []).reduce((sum, extra) => sum + extra.price, 0);
        const itemUnitPrice = basePrice + extrasPrice;
        const itemTotal = itemUnitPrice * item.quantity;

        // Build extras display
        let extrasHTML = '';
        if(item.extras && item.extras.length > 0) {
            extrasHTML = '<tr><td colspan="3" style="padding: 4px 0 4px 40px; font-size: 14px; color: #666;">';
            item.extras.forEach(extra => {
                const extraPriceText = extra.price === 0 ? '' : ` (+${extra.price.toFixed(2)}€)`;
                extrasHTML += `+ ${extra.name}${extraPriceText}<br>`;
            });
            extrasHTML += '</td></tr>';
        }

        return `
            <tr>
                <td style="padding: 8px 0; font-size: 16px; font-weight: bold;">${item.quantity}x</td>
                <td style="padding: 8px 0; font-size: 16px;">${item.name}${sizeText}</td>
                <td style="padding: 8px 0; font-size: 16px; text-align: right;">${itemTotal.toFixed(2)}€</td>
            </tr>
            ${extrasHTML}
        `;
    }).join('');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Rechnung #${order.id}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Courier New', monospace;
                    padding: 20px;
                    max-width: 400px;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #000;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                }
                .header h1 {
                    font-size: 32px;
                    margin-bottom: 5px;
                }
                .header h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .company-info {
                    text-align: center;
                    font-size: 12px;
                    margin-bottom: 10px;
                }
                .section {
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px dashed #666;
                }
                .section:last-child {
                    border-bottom: none;
                }
                .label {
                    font-weight: bold;
                    font-size: 14px;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }
                .value {
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .total-section {
                    background: #000;
                    color: #fff;
                    padding: 12px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    font-size: 12px;
                    border-top: 2px solid #000;
                    padding-top: 10px;
                    margin-top: 20px;
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🍕 ERFURT PIZZA</h1>
                <h2>RECHNUNG</h2>
                <div class="company-info">
                    An der Lache 41, 99086 Erfurt<br>
                    Tel: 0361 65 44 22 75<br>
                    Tel: 0361 73 10 76 56
                </div>
            </div>

            <div class="section">
                <div class="label">Rechnungsnr:</div>
                <div class="value">#${order.id}</div>
                <div class="label">Datum:</div>
                <div class="value">${formattedDate}</div>
            </div>

            <div class="section">
                <div class="label">Kunde:</div>
                <div class="value">
                    ${order.name}<br>
                    ${order.deliveryMethod === 'delivery' ? `${order.street}<br>${order.zip} ${order.city}<br>` : ''}
                    Tel: ${order.phone}
                    ${order.email ? `<br>E-Mail: ${order.email}` : ''}
                </div>
            </div>

            <div class="section">
                <div class="label">Bestellte Artikel:</div>
                <table>
                    ${items}
                </table>
            </div>

            <div class="total-section">
                GESAMT: ${order.total}
            </div>

            <div class="section">
                <div class="label">Zahlungsmethode:</div>
                <div class="value">
                    ${order.paymentMethod === 'cash' ? '💰 BARZAHLUNG' :
                      order.paymentMethod === 'paypal' ? '💳 PAYPAL' :
                      '💳 KREDITKARTE'}
                </div>
                <div class="label">Lieferart:</div>
                <div class="value">
                    ${order.deliveryMethod === 'delivery' ? '🚚 LIEFERUNG' : '📦 ABHOLUNG (20% RABATT)'}
                </div>
            </div>

            ${order.notes ? `
            <div class="section">
                <div class="label">⚠️ Anmerkungen:</div>
                <div class="value">${order.notes}</div>
            </div>
            ` : ''}

            <div class="footer">
                VIELEN DANK FÜR IHRE BESTELLUNG!<br>
                Erfurt Pizza - An der Lache 41, 99086 Erfurt
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// Print both receipts automatically in sequence
function printBothReceipts(orderId) {
    // First print kitchen receipt
    printKitchenReceipt(orderId);

    // Then print invoice after a delay to allow first print dialog to complete
    setTimeout(() => {
        printInvoice(orderId);
    }, 1000);
}
