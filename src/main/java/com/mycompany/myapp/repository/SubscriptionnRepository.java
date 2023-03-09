package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Subscriptionn;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Subscriptionn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionnRepository extends JpaRepository<Subscriptionn, String> {}
