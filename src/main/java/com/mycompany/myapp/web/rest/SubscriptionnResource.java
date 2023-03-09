package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Subscriptionn;
import com.mycompany.myapp.repository.SubscriptionnRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Subscriptionn}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubscriptionnResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionnResource.class);

    private static final String ENTITY_NAME = "subscriptionn";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscriptionnRepository subscriptionnRepository;

    public SubscriptionnResource(SubscriptionnRepository subscriptionnRepository) {
        this.subscriptionnRepository = subscriptionnRepository;
    }

    /**
     * {@code POST  /subscriptionns} : Create a new subscriptionn.
     *
     * @param subscriptionn the subscriptionn to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscriptionn, or with status {@code 400 (Bad Request)} if the subscriptionn has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscriptionns")
    public ResponseEntity<Subscriptionn> createSubscriptionn(@RequestBody Subscriptionn subscriptionn) throws URISyntaxException {
        log.debug("REST request to save Subscriptionn : {}", subscriptionn);
        if (subscriptionn.getId() != null) {
            throw new BadRequestAlertException("A new subscriptionn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subscriptionn result = subscriptionnRepository.save(subscriptionn);
        return ResponseEntity
            .created(new URI("/api/subscriptionns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /subscriptionns/:id} : Updates an existing subscriptionn.
     *
     * @param id the id of the subscriptionn to save.
     * @param subscriptionn the subscriptionn to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriptionn,
     * or with status {@code 400 (Bad Request)} if the subscriptionn is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscriptionn couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscriptionns/{id}")
    public ResponseEntity<Subscriptionn> updateSubscriptionn(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Subscriptionn subscriptionn
    ) throws URISyntaxException {
        log.debug("REST request to update Subscriptionn : {}, {}", id, subscriptionn);
        if (subscriptionn.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subscriptionn.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subscriptionnRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        subscriptionn.setIsPersisted();
        Subscriptionn result = subscriptionnRepository.save(subscriptionn);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscriptionn.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /subscriptionns/:id} : Partial updates given fields of an existing subscriptionn, field will ignore if it is null
     *
     * @param id the id of the subscriptionn to save.
     * @param subscriptionn the subscriptionn to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriptionn,
     * or with status {@code 400 (Bad Request)} if the subscriptionn is not valid,
     * or with status {@code 404 (Not Found)} if the subscriptionn is not found,
     * or with status {@code 500 (Internal Server Error)} if the subscriptionn couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/subscriptionns/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Subscriptionn> partialUpdateSubscriptionn(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Subscriptionn subscriptionn
    ) throws URISyntaxException {
        log.debug("REST request to partial update Subscriptionn partially : {}, {}", id, subscriptionn);
        if (subscriptionn.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subscriptionn.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subscriptionnRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Subscriptionn> result = subscriptionnRepository
            .findById(subscriptionn.getId())
            .map(existingSubscriptionn -> {
                return existingSubscriptionn;
            })
            .map(subscriptionnRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscriptionn.getId())
        );
    }

    /**
     * {@code GET  /subscriptionns} : get all the subscriptionns.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscriptionns in body.
     */
    @GetMapping("/subscriptionns")
    public List<Subscriptionn> getAllSubscriptionns() {
        log.debug("REST request to get all Subscriptionns");
        return subscriptionnRepository.findAll();
    }

    /**
     * {@code GET  /subscriptionns/:id} : get the "id" subscriptionn.
     *
     * @param id the id of the subscriptionn to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscriptionn, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscriptionns/{id}")
    public ResponseEntity<Subscriptionn> getSubscriptionn(@PathVariable String id) {
        log.debug("REST request to get Subscriptionn : {}", id);
        Optional<Subscriptionn> subscriptionn = subscriptionnRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subscriptionn);
    }

    /**
     * {@code DELETE  /subscriptionns/:id} : delete the "id" subscriptionn.
     *
     * @param id the id of the subscriptionn to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscriptionns/{id}")
    public ResponseEntity<Void> deleteSubscriptionn(@PathVariable String id) {
        log.debug("REST request to delete Subscriptionn : {}", id);
        subscriptionnRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
