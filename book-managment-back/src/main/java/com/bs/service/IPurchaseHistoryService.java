package com.bs.service;

import com.bs.model.PurchaseHistory;
import com.bs.repository.projection.IPurchaseItem;

import java.util.List;

public interface IPurchaseHistoryService {
	PurchaseHistory savePurchaseHistory(PurchaseHistory purchaseHistory);
	
	List<IPurchaseItem> findPurchasedItemsByUserId(Long userId);

	List<IPurchaseItem> findAllPurchaseItems();
}
