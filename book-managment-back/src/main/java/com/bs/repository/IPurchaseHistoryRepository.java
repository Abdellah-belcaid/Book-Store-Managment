package com.bs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bs.model.PurchaseHistory;
import com.bs.repository.projection.IPurchaseItem;

import java.util.List;

public interface IPurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
	@Query("select " + "b.title as title, ph.price as price, ph.purchaseTime as purchaseTime  "
			+ "from PurchaseHistory ph left join Book b on b.id = ph.bookId " + "where ph.userId = :userId")
	List<IPurchaseItem> findAllPurchasesOfUser(@Param("userId") Long userId);

	@Query("select " + "b.title as title, ph.price as price, ph.purchaseTime as purchaseTime  "
			+ "from PurchaseHistory ph left join Book b on b.id = ph.bookId ")
	List<IPurchaseItem> findAllPurchaseItems();
}
