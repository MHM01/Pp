package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Consumer;
import com.mycompany.myapp.repository.ConsumerRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Consumer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsumerResource {

    private final Logger log = LoggerFactory.getLogger(ConsumerResource.class);

    private static final String ENTITY_NAME = "consumer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsumerRepository consumerRepository;

    public ConsumerResource(ConsumerRepository consumerRepository) {
        this.consumerRepository = consumerRepository;
    }

    /**
     * {@code POST  /consumers} : Create a new consumer.
     *
     * @param consumer the consumer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consumer, or with status {@code 400 (Bad Request)} if the consumer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consumers")
    public ResponseEntity<Consumer> createConsumer(@RequestBody Consumer consumer) throws URISyntaxException {
        log.debug("REST request to save Consumer : {}", consumer);
        if (consumer.getId() != null) {
            throw new BadRequestAlertException("A new consumer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consumer result = consumerRepository.save(consumer);
        return ResponseEntity
            .created(new URI("/api/consumers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /consumers/:id} : Updates an existing consumer.
     *
     * @param id the id of the consumer to save.
     * @param consumer the consumer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consumer,
     * or with status {@code 400 (Bad Request)} if the consumer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consumer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consumers/{id}")
    public ResponseEntity<Consumer> updateConsumer(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Consumer consumer
    ) throws URISyntaxException {
        log.debug("REST request to update Consumer : {}, {}", id, consumer);
        if (consumer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consumer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consumerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        consumer.setIsPersisted();
        Consumer result = consumerRepository.save(consumer);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consumer.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /consumers/:id} : Partial updates given fields of an existing consumer, field will ignore if it is null
     *
     * @param id the id of the consumer to save.
     * @param consumer the consumer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consumer,
     * or with status {@code 400 (Bad Request)} if the consumer is not valid,
     * or with status {@code 404 (Not Found)} if the consumer is not found,
     * or with status {@code 500 (Internal Server Error)} if the consumer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/consumers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Consumer> partialUpdateConsumer(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Consumer consumer
    ) throws URISyntaxException {
        log.debug("REST request to partial update Consumer partially : {}, {}", id, consumer);
        if (consumer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consumer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consumerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Consumer> result = consumerRepository
            .findById(consumer.getId())
            .map(existingConsumer -> {
                if (consumer.getName() != null) {
                    existingConsumer.setName(consumer.getName());
                }

                return existingConsumer;
            })
            .map(consumerRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consumer.getId())
        );
    }

    /**
     * {@code GET  /consumers} : get all the consumers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consumers in body.
     */
    @GetMapping("/consumers")
    public List<Consumer> getAllConsumers() {
        log.debug("REST request to get all Consumers");
        return consumerRepository.findAll();
    }

    /**
     * {@code GET  /consumers/:id} : get the "id" consumer.
     *
     * @param id the id of the consumer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consumer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consumers/{id}")
    public ResponseEntity<Consumer> getConsumer(@PathVariable String id) {
        log.debug("REST request to get Consumer : {}", id);
        Optional<Consumer> consumer = consumerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consumer);
    }

    /**
     * {@code DELETE  /consumers/:id} : delete the "id" consumer.
     *
     * @param id the id of the consumer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consumers/{id}")
    public ResponseEntity<Void> deleteConsumer(@PathVariable String id) {
        log.debug("REST request to delete Consumer : {}", id);
        consumerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
